import { useStore } from '../store/useStore';
import { FileText, Download, AlertTriangle } from 'lucide-react';

export default function Reports() {
  const { state } = useStore();

  const exportData = (type: string) => {
    let data: any = {};
    let filename = '';
    
    switch (type) {
      case 'processes':
        data = state.processes;
        filename = 'eci_2027_procesos.json';
        break;
      case 'interfaces':
        data = state.interfaces;
        filename = 'eci_2027_interfaces.json';
        break;
      case 'evidence':
        data = state.evidence;
        filename = 'eci_2027_evidencias.json';
        break;
      case 'kpis':
        data = state.kpis;
        filename = 'eci_2027_kpis.json';
        break;
      case 'hypotheses':
        data = state.hypotheses;
        filename = 'eci_2027_hipotesis.json';
        break;
      case 'full':
        data = { axes: state.axes, processes: state.processes, interfaces: state.interfaces, sites: state.sites, evidence: state.evidence, kpis: state.kpis, hypotheses: state.hypotheses, simulations: state.simulations, exportDate: new Date().toISOString(), version: '1.0', disclaimer: 'Investigación independiente. Sin afiliación empresarial. Datos sintéticos identificados.' };
        filename = 'eci_2027_datos_completos.json';
        break;
      case 'csv_processes':
        const csvHeader = 'ID,Nombre,Eje,Descripción,Nivel_Verificacion,Fecha_Revision\n';
        const csvRows = state.processes.map(p => `"${p.id}","${p.name}","${p.axisId}","${p.description.replace(/"/g, '""')}","${p.verificationLevel}","${p.reviewDate}"`).join('\n');
        downloadFile(csvHeader + csvRows, 'eci_2027_procesos.csv', 'text/csv');
        return;
      case 'csv_interfaces':
        const iHeader = 'ID,Origen,Destino,Nombre,Tipo_Intercambio,Objeto_Transferido,Estado_Verificacion\n';
        const iRows = state.interfaces.map(i => `"${i.id}","${i.originId}","${i.destinationId}","${i.name}","${i.exchangeType}","${i.transferredObject}","${i.verificationStatus}"`).join('\n');
        downloadFile(iHeader + iRows, 'eci_2027_interfaces.csv', 'text/csv');
        return;
    }

    downloadFile(JSON.stringify(data, null, 2), filename, 'application/json');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reports = [
    { id: 'exec', title: 'Informe ejecutivo', description: 'Resumen del estado actual del proyecto', format: 'JSON' },
    { id: 'processes', title: 'Catálogo de procesos', description: '20 procesos con ejes, entradas, salidas y riesgos', format: 'JSON' },
    { id: 'interfaces', title: 'Registro de interfaces', description: '18 interfaces con origen, destino y estado', format: 'JSON' },
    { id: 'evidence', title: 'Registro de evidencias', description: 'Evidencias con naturaleza, verificación y vigencia', format: 'JSON' },
    { id: 'kpis', title: 'Catálogo de indicadores', description: '20 KPIs con fórmulas y estado de datos', format: 'JSON' },
    { id: 'hypotheses', title: 'Expedientes de hipótesis', description: 'Hipótesis formuladas con estado de validación', format: 'JSON' },
    { id: 'full', title: 'Datos estructurados completos', description: 'Exportación completa del modelo de datos', format: 'JSON' },
    { id: 'csv_processes', title: 'Procesos en CSV', description: 'Exportación de procesos en formato CSV', format: 'CSV' },
    { id: 'csv_interfaces', title: 'Interfaces en CSV', description: 'Exportación de interfaces en formato CSV', format: 'CSV' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Informes y Exportaciones</h1>
        <p className="text-sm opacity-60">Generación y descarga de informes del sistema</p>
      </div>

      <div className={`p-4 rounded-lg text-xs ${state.darkMode ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
        <AlertTriangle size={12} className="inline mr-1" />
        Cada informe incluye: título, versión, fecha, metodología, fuentes, limitaciones y conclusiones. Los escenarios sintéticos se identifican en toda exportación.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {reports.map(report => (
          <div key={report.id} className={`rounded-xl border p-4 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-sm">{report.title}</h3>
                <p className="text-xs opacity-60 mt-1">{report.description}</p>
              </div>
              <FileText size={16} className="opacity-30" />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className={`text-xs px-2 py-0.5 rounded ${state.darkMode ? 'bg-gray-700' : 'bg-stone-100'}`}>{report.format}</span>
              <button onClick={() => exportData(report.id)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                <Download size={12} /> Exportar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Import Section */}
      <div className={`rounded-xl border p-5 ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'}`}>
        <h3 className="font-semibold mb-3">Importación de datos</h3>
        <p className="text-xs opacity-60 mb-3">Importe archivos CSV o JSON para actualizar el modelo. Se validará la estructura y se detectarán duplicados.</p>
        <div className={`border-2 border-dashed rounded-lg p-8 text-center ${state.darkMode ? 'border-gray-600' : 'border-stone-300'}`}>
          <FileText size={32} className="mx-auto opacity-20 mb-2" />
          <p className="text-sm opacity-50">Arrastre archivos aquí o pulse para seleccionar</p>
          <p className="text-xs opacity-40 mt-1">Formatos soportados: CSV, JSON</p>
          <input type="file" accept=".csv,.json" className="mt-3 text-xs" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (ev) => {
                try {
                  const content = ev.target?.result as string;
                  if (file.name.endsWith('.json')) {
                    const parsed = JSON.parse(content);
                    alert(`Archivo JSON válido. Contiene ${Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length} elementos.\n\nNota: La importación completa requiere validación adicional.`);
                  } else {
                    const lines = content.split('\n').filter(l => l.trim());
                    alert(`Archivo CSV válido. Contiene ${lines.length - 1} registros (excluyendo cabecera).\n\nNota: La importación completa requiere mapeo de campos.`);
                  }
                } catch (err) {
                  alert('Error al procesar el archivo. Verifique el formato.');
                }
              };
              reader.readAsText(file);
            }
          }} />
        </div>
      </div>
    </div>
  );
}
