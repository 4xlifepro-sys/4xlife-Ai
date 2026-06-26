import { Link } from 'react-router-dom';
import { Shield, BrainCircuit, Activity, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Institutional <span className="text-blue-500">Market Structure</span> Validation
        </h1>
        <p className="text-lg md:text-xl text-[#8A95A5] max-w-3xl mx-auto leading-relaxed">
          Real-time 4H → 5M market structure scanning across 20 pairs using precision technicals. 
          Validated by deterministic code and institutional AI review.
        </p>
        
        <div className="pt-8">
          <Link
            to="/account"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0A0D12]"
          >
            Manage Plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      <div className="mt-32 grid md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-[#11141A] border border-[#202735]"
        >
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Live Data Only</h3>
          <p className="text-[#8A95A5] leading-relaxed">
            Powered by real Twelve Data OHLC candles. We never simulate, mock, or fabricate price data. If liquidity drops, we wait.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-[#11141A] border border-[#202735]"
        >
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Strict Code Detection</h3>
          <p className="text-[#8A95A5] leading-relaxed">
            Deterministic detection of 4H Bias, Pullback confirmations, and 5M Break of Structure validations. Strict structural stop-loss adherence built-in.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-[#11141A] border border-[#202735]"
        >
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
            <BrainCircuit className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">AI Validation</h3>
          <p className="text-[#8A95A5] leading-relaxed">
            Premium setups are automatically submitted to Gemini for institutional risk review. Signals are intentionally rare by design — quality over volume.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
