import { useCallback, useMemo } from 'react';
import { ReactFlow, Node, Edge, Background, Controls, MiniMap, useNodesState, useEdgesState, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useStore } from '../store/useStore';

export default function ProcessMap() {
  const { state, dispatch } = useStore();

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const axisPositions: Record<string, { x: number; y: number }> = {
      'EJE1': { x: 0, y: 0 },
      'EJE2': { x: 500, y: 0 },
      'EJE3': { x: 1000, y: 0 },
      'EJE4': { x: 1500, y: 0 },
      'EJE5': { x: 2000, y: 0 },
    };

    const axisColors: Record<string, string> = {
      'EJE1': '#6B8E9B',
      'EJE2': '#7BA38C',
      'EJE3': '#9B8EA8',
      'EJE4': '#B8956A',
      'EJE5': '#8B7E7E',
    };

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Create axis header nodes
    state.axes.forEach(axis => {
      const pos = axisPositions[axis.id];
      nodes.push({
        id: `axis_${axis.id}`,
        type: 'default',
        position: { x: pos.x, y: -100 },
        data: { label: `${axis.id}\n${axis.name}` },
        style: { background: axis.color, color: 'white', fontWeight: 'bold', fontSize: '11px', padding: '8px', borderRadius: '8px', width: '180px', textAlign: 'center', border: 'none' },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });
    });

    // Create process nodes
    state.processes.forEach(process => {
      const axis = state.axes.find(a => a.id === process.axisId);
      if (!axis) return;
      const axisProcs = state.processes.filter(p => p.axisId === process.axisId);
      const idx = axisProcs.findIndex(p => p.id === process.id);
      const basePos = axisPositions[process.axisId];
      
      nodes.push({
        id: process.id,
        type: 'default',
        position: { x: basePos.x, y: 50 + idx * 120 },
        data: { label: `${process.id}: ${process.name}` },
        style: { 
          background: state.darkMode ? '#1f2937' : '#ffffff', 
          color: state.darkMode ? '#e5e7eb' : '#374151',
          border: `2px solid ${axisColors[process.axisId]}`,
          borderRadius: '8px', 
          padding: '10px', 
          fontSize: '11px', 
          width: '180px',
          textAlign: 'left',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });
    });

    // Create interface edges
    state.interfaces.forEach(iface => {
      edges.push({
        id: iface.id,
        source: iface.originId,
        target: iface.destinationId,
        label: `${iface.id}`,
        style: { stroke: state.darkMode ? '#6b7280' : '#94a3b8', strokeWidth: 2 },
        labelStyle: { fontSize: 10, fontWeight: 'bold', fill: state.darkMode ? '#9ca3af' : '#64748b' },
        labelBgStyle: { fill: state.darkMode ? '#1f2937' : '#ffffff', fillOpacity: 0.9 },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 4,
        animated: false,
      });
    });

    // Add P05 transversal connections (dashed)
    ['P06'].forEach(targetId => {
      edges.push({
        id: 'P05_transversal_1',
        source: 'P05',
        target: targetId,
        label: 'Datos maestros',
        style: { stroke: '#7BA38C', strokeWidth: 1.5, strokeDasharray: '5,5' },
        labelStyle: { fontSize: 9, fill: '#7BA38C' },
        labelBgStyle: { fill: state.darkMode ? '#1f2937' : '#ffffff', fillOpacity: 0.9 },
        labelBgPadding: [3, 1] as [number, number],
        labelBgBorderRadius: 3,
      });
    });

    return { nodes, edges };
  }, [state.processes, state.interfaces, state.axes, state.darkMode]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: any, node: Node) => {
    if (node.id.startsWith('P')) {
      dispatch({ type: 'SET_VIEW', payload: 'processes' });
    }
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Mapa Maestro Interactivo</h1>
        <p className="text-sm opacity-60 mt-1">Representación de 20 procesos y 18 interfaces operativas. Arrastre para desplazar. Rueda para ampliar.</p>
      </div>
      
      <div className={`rounded-xl border overflow-hidden ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`} style={{ height: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color={state.darkMode ? '#374151' : '#e2e8f0'} gap={20} />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              if (node.id.startsWith('axis_')) return '#6B8E9B';
              const proc = state.processes.find(p => p.id === node.id);
              if (proc) {
                const axis = state.axes.find(a => a.id === proc.axisId);
                return axis?.color || '#94a3b8';
              }
              return '#94a3b8';
            }}
            style={{ background: state.darkMode ? '#1f2937' : '#f8fafc' }}
          />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className={`rounded-xl border p-4 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h3 className="font-semibold text-sm mb-3">Leyenda</h3>
        <div className="flex flex-wrap gap-4">
          {state.axes.map(axis => (
            <div key={axis.id} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: axis.color }} />
              <span className="text-xs">{axis.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gray-400" />
            <span className="text-xs">Interfaz operativa</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 border-t-2 border-dashed border-green-500" />
            <span className="text-xs">Referencia transversal (P05)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
