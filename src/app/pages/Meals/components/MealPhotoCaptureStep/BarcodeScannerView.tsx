import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scanner } from '@yudiel/react-qr-scanner';
import GlassCard from '../../../../../ui/cards/GlassCard';
import SpatialIcon from '../../../../../ui/icons/SpatialIcon';
import { ICONS } from '../../../../../ui/icons/registry';
import { openFoodFactsService, type BarcodeProductResult } from '../../../../../system/services/openFoodFactsService';
import type { ScannedProduct } from '../MealScanFlow/ScanFlowState';
import logger from '../../../../../lib/utils/logger';

interface BarcodeScannerViewProps {
  onProductScanned: (product: ScannedProduct) => void;
  onClose: () => void;
}

const BarcodeScannerView: React.FC<BarcodeScannerViewProps> = ({
  onProductScanned,
  onClose,
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastScannedBarcode, setLastScannedBarcode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleScan = async (detectedCodes: any[]) => {
    if (!isScanning || isLoading || detectedCodes.length === 0) return;

    const barcode = detectedCodes[0]?.rawValue;
    if (!barcode || barcode === lastScannedBarcode) return;

    setLastScannedBarcode(barcode);
    setIsScanning(false);
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    logger.info('BARCODE_SCANNER', 'Barcode detected, fetching product info', {
      barcode,
      timestamp: new Date().toISOString(),
    });

    try {
      const result: BarcodeProductResult = await openFoodFactsService.getProductByBarcode(barcode);

      if (!result.success || !result.product) {
        logger.warn('BARCODE_SCANNER', 'Product not found or error', {
          barcode,
          error: result.error,
          timestamp: new Date().toISOString(),
        });

        setError(result.error || 'Produit non trouvé');
        setTimeout(() => {
          setError(null);
          setIsScanning(true);
          setLastScannedBarcode(null);
          setIsLoading(false);
        }, 3000);
        return;
      }

      const mealItem = openFoodFactsService.convertToMealItem(result.product, 1);

      if (!mealItem) {
        setError('Impossible de convertir les données du produit');
        setTimeout(() => {
          setError(null);
          setIsScanning(true);
          setLastScannedBarcode(null);
          setIsLoading(false);
        }, 3000);
        return;
      }

      const scannedProduct: ScannedProduct = {
        barcode: result.product.barcode,
        name: result.product.name,
        brand: result.product.brand,
        image_url: result.product.image_url,
        mealItem,
        portionMultiplier: 1,
        scannedAt: new Date().toISOString(),
      };

      logger.info('BARCODE_SCANNER', 'Product successfully scanned and converted', {
        barcode,
        productName: scannedProduct.name,
        calories: mealItem.calories,
        timestamp: new Date().toISOString(),
      });

      setSuccessMessage(`${scannedProduct.name} ajouté !`);

      setTimeout(() => {
        onProductScanned(scannedProduct);
        setSuccessMessage(null);
        setIsScanning(true);
        setLastScannedBarcode(null);
        setIsLoading(false);
      }, 1500);

    } catch (err) {
      logger.error('BARCODE_SCANNER', 'Error processing barcode', {
        barcode,
        error: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toISOString(),
      });

      setError('Erreur lors du traitement du code-barre');
      setTimeout(() => {
        setError(null);
        setIsScanning(true);
        setLastScannedBarcode(null);
        setIsLoading(false);
      }, 3000);
    }
  };

  const handleError = (error: any) => {
    logger.error('BARCODE_SCANNER', 'Camera error', {
      error: error?.message || String(error),
      timestamp: new Date().toISOString(),
    });
    setError('Erreur d\'accès à la caméra');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg"
      >
        <GlassCard
          className="p-6 relative overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, rgba(79, 70, 229, 0.08) 0%, transparent 50%),
              rgba(17, 24, 39, 0.95)
            `,
            borderColor: 'rgba(99, 102, 241, 0.3)',
            boxShadow: `
              0 20px 60px rgba(0, 0, 0, 0.5),
              0 0 40px rgba(99, 102, 241, 0.2),
              inset 0 2px 0 rgba(255, 255, 255, 0.15)
            `,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(99, 102, 241, 0.45), rgba(79, 70, 229, 0.35))
                  `,
                  border: '2px solid rgba(99, 102, 241, 0.6)',
                  boxShadow: `
                    0 0 20px rgba(99, 102, 241, 0.6),
                    0 0 40px rgba(99, 102, 241, 0.3)
                  `,
                }}
              >
                <SpatialIcon
                  Icon={ICONS.Scan}
                  size={18}
                  style={{
                    color: '#fff',
                    filter: 'drop-shadow(0 2px 8px rgba(99, 102, 241, 0.9))',
                  }}
                />
              </div>
              <h4 className="text-white font-bold text-base">
                Scanner Code-Barre
              </h4>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-gray-700/50"
              style={{
                border: '1px solid rgba(156, 163, 175, 0.3)',
              }}
              aria-label="Fermer"
            >
              <SpatialIcon Icon={ICONS.X} size={16} className="text-gray-400" />
            </button>
          </div>

          <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
            {isScanning && (
              <Scanner
                onScan={handleScan}
                onError={handleError}
                formats={[
                  'ean_13',
                  'ean_8',
                  'upc_a',
                  'upc_e',
                  'code_128',
                  'code_39',
                ]}
                components={{
                  audio: false,
                  finder: true,
                }}
                styles={{
                  container: {
                    width: '100%',
                    height: '100%',
                  },
                  video: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  },
                }}
              />
            )}

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-64 h-48 relative"
                  style={{
                    border: '3px solid rgba(99, 102, 241, 0.6)',
                    borderRadius: '12px',
                    boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
                  }}
                >
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-400 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-400 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-indigo-400 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-indigo-400 rounded-br-lg"></div>

                  {isScanning && (
                    <motion.div
                      className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.8))',
                      }}
                      animate={{
                        top: ['10%', '90%', '10%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="animate-spin w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full mx-auto mb-3"></div>
                      <p className="text-white font-medium">Recherche du produit...</p>
                    </div>
                  </motion.div>
                )}

                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center mx-auto mb-3">
                        <SpatialIcon Icon={ICONS.Check} size={32} className="text-green-400" />
                      </div>
                      <p className="text-white font-bold text-lg">{successMessage}</p>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="text-center px-6">
                      <div className="w-16 h-16 rounded-full bg-red-500/30 flex items-center justify-center mx-auto mb-3">
                        <SpatialIcon Icon={ICONS.AlertCircle} size={32} className="text-red-400" />
                      </div>
                      <p className="text-white font-bold text-lg mb-2">Erreur</p>
                      <p className="text-red-200 text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">
              Positionnez le code-barre dans le cadre
            </p>
            <p className="text-gray-500 text-xs">
              Formats supportés : EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default BarcodeScannerView;
