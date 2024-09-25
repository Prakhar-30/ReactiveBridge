"use client"

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ChevronDown, ArrowRightLeft, Zap, Clock, Sun, Moon, Coins, Grid } from 'lucide-react'

const themes = {
  light: {
    background: 'bg-gradient-to-br from-blue-50 via-white to-cyan-100',
    text: 'text-gray-800',
    card: 'bg-white',
    input: 'bg-gray-100',
    button: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
    border: 'border-blue-200',
    shadow: 'shadow-lg shadow-blue-200/50',
  },
  dark: {
    background: 'bg-gradient-to-br from-gray-900 via-blue-900 to-black',
    text: 'text-gray-100',
    card: 'bg-gray-800/80',
    input: 'bg-gray-700/70',
    button: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
    border: 'border-blue-500/30',
    shadow: 'shadow-md shadow-blue-500/20',
  },
}

export default function FuturisticBridgeDApp() {
  const [theme, setTheme] = useState('dark')
  const [transferType, setTransferType] = useState('token')
  const [fromChain, setFromChain] = useState('Ethereum')
  const [toChain, setToChain] = useState('Binance Smart Chain')
  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('BNB')
  const [amount, setAmount] = useState('')
  const [nftId, setNftId] = useState('')
  const controls = useAnimation()

  const chains = ['Ethereum', 'Binance Smart Chain', 'Polygon', 'Avalanche', 'Solana']
  const tokens = {
    'Ethereum': ['ETH', 'USDT', 'USDC'],
    'Binance Smart Chain': ['BNB', 'BUSD', 'CAKE'],
    'Polygon': ['MATIC', 'USDT', 'AAVE'],
    'Avalanche': ['AVAX', 'USDT', 'JOE'],
    'Solana': ['SOL', 'USDC', 'RAY']
  }

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    })
  }, [controls])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const currentTheme = themes[theme]

  const renderNFTImage = () => {
    if (nftId === '1') {
      return (
        <div className="mt-4 flex justify-center">
          <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full grid grid-cols-8 grid-rows-8">
              {Array(64).fill(0).map((_, i) => (
                <div key={i} className={`bg-${['blue', 'cyan', 'teal', 'sky', 'indigo'][Math.floor(Math.random() * 5)]}-${Math.floor(Math.random() * 3 + 3)}00`}></div>
              ))}
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} font-sans overflow-hidden transition-all duration-300 flex flex-col`}>
      <header className="flex justify-between items-center p-6 backdrop-blur-sm bg-opacity-30 bg-gray-900">
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          NexusBridge
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full ${currentTheme.input} ${currentTheme.shadow}`}
          >
            {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${currentTheme.button} text-white px-6 py-2 rounded-full transition-all duration-300 ${currentTheme.shadow}`}
          >
            Connect Wallet
          </motion.button>
        </div>
      </header>

      <main className="flex-grow container mx-auto mt-12 p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          className={`${currentTheme.card} rounded-3xl p-8 w-full max-w-2xl mx-auto backdrop-blur-lg ${currentTheme.shadow} ${currentTheme.border} border`}
        >
          <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Cross-Chain Bridge</h2>
          <div className="space-y-6">
            <div className="flex justify-center space-x-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTransferType('token')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  transferType === 'token' ? currentTheme.button : currentTheme.input
                } transition-all duration-300`}
              >
                <Coins className="w-5 h-5" />
                <span>Token Transfer</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTransferType('nft')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  transferType === 'nft' ? currentTheme.button : currentTheme.input
                } transition-all duration-300`}
              >
                <Grid className="w-5 h-5" />
                <span>NFT Transfer</span>
              </motion.button>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-5/12">
                <label className="block text-sm font-medium mb-2">From Chain</label>
                <div className="relative">
                  <select
                    value={fromChain}
                    onChange={(e) => {
                      setFromChain(e.target.value)
                      setFromToken(tokens[e.target.value][0])
                    }}
                    className={`w-full ${currentTheme.input} rounded-lg py-3 px-4 appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300`}
                  >
                    {chains.map((chain) => (
                      <option key={chain}>{chain}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="flex-shrink-0">
                <ArrowRightLeft className="text-blue-500 w-6 h-6" />
              </div>
              <div className="w-5/12">
                <label className="block text-sm font-medium mb-2">To Chain</label>
                <div className="relative">
                  <select
                    value={toChain}
                    onChange={(e) => {
                      setToChain(e.target.value)
                      setToToken(tokens[e.target.value][0])
                    }}
                    className={`w-full ${currentTheme.input} rounded-lg py-3 px-4 appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300`}
                  >
                    {chains.map((chain) => (
                      <option key={chain}>{chain}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            {transferType === 'token' && (
              <div className="flex justify-between items-center">
                <div className="w-5/12">
                  <label className="block text-sm font-medium mb-2">From Token</label>
                  <div className="relative">
                    <select
                      value={fromToken}
                      onChange={(e) => setFromToken(e.target.value)}
                      className={`w-full ${currentTheme.input} rounded-lg py-3 px-4 appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300`}
                    >
                      {tokens[fromChain].map((token) => (
                        <option key={token}>{token}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="w-5/12">
                  <label className="block text-sm font-medium mb-2">To Token</label>
                  <div className="relative">
                    <select
                      value={toToken}
                      onChange={(e) => setToToken(e.target.value)}
                      className={`w-full ${currentTheme.input} rounded-lg py-3 px-4 appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300`}
                    >
                      {tokens[toChain].map((token) => (
                        <option key={token}>{token}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-medium mb-2">
                {transferType === 'token' ? 'Amount' : 'NFT ID'}
              </label>
              <input
                type="text"
                value={transferType === 'token' ? amount : nftId}
                onChange={(e) => transferType === 'token' ? setAmount(e.target.value) : setNftId(e.target.value)}
                className={`w-full ${currentTheme.input} rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300`}
                placeholder={transferType === 'token' ? "Enter amount" : "Enter NFT ID"}
              />
            </motion.div>
            {transferType === 'nft' && renderNFTImage()}
            <div className="flex justify-between text-sm text-gray-400">
              <span className="flex items-center"><Clock className="mr-2" size={16} /> Est. Time: 5 mins</span>
              <span className="flex items-center"><Zap className="mr-2" size={16} /> Fee: 0.1%</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full ${currentTheme.button} text-white py-3 rounded-lg font-semibold transition-all duration-300`}
            >
              Initiate {transferType === 'token' ? 'Token' : 'NFT'} Bridge
            </motion.button>
          </div>
        </motion.div>
      </main>

      <footer className="w-full p-6 mt-auto backdrop-blur-sm bg-opacity-30 bg-gray-900">
        <div className="flex justify-center space-x-4 text-sm">
          <a href="#" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#" className="hover:text-blue-400 transition-colors">FAQ</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
        </div>
      </footer>
    </div>
  )
}