import React, { useRef } from 'react';
import PageWrapper from '../PageWrapper';
import ReportsView from './ReportsView'; // Reuse the report view for the preview
import { InventoryItem } from '../../types';

declare const html2canvas: any;

interface ExportImageViewProps {
  inventory: InventoryItem[];
}

const ExportImageView: React.FC<ExportImageViewProps> = ({ inventory }) => {
  const reportPreviewRef = useRef<HTMLDivElement>(null);

  const handleExportAsImage = () => {
    if (reportPreviewRef.current) {
      html2canvas(reportPreviewRef.current, {
          useCORS: true,
          backgroundColor: '#ffffff', // Set a background color for transparency
          scale: 2 // Increase resolution
      }).then((canvas: HTMLCanvasElement) => {
        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = 'inventory_report.png';
        link.href = image;
        link.click();
      }).catch((err: any) => {
          console.error("Error exporting image:", err);
          alert("Could not export image. See console for details.");
      });
    }
  };

  return (
    <PageWrapper title="Export Report as Image">
      <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Click the button below to download the current inventory summary as a PNG image file.
        </p>
        <button
          onClick={handleExportAsImage}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Export as image
        </button>
      </div>
      <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Report Preview</h3>
        <div ref={reportPreviewRef} className="p-4 bg-white">
          <ReportsView inventory={inventory} isPreview={true} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ExportImageView;
