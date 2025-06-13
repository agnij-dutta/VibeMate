'use client';

import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchNetwork, useNetwork } from 'wagmi';
import { coreTestnet } from '@/lib/wagmi';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, ChevronDown, AlertTriangle, Check, ExternalLink } from "lucide-react";

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading: isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Temporary: Clear any cached wallet connections
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wagmi.cache');
      localStorage.removeItem('wagmi.connected');
      localStorage.removeItem('wagmi.wallet');
      localStorage.removeItem('wagmi.store');
    }
  }, []);

  const isCorrectChain = chainId === coreTestnet.id;

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Don't render anything until mounted to prevent hydration errors
  if (!mounted) {
    return (
      <Button disabled className="gap-2">
        <Wallet className="w-4 h-4" />
        Loading...
      </Button>
    );
  }

  if (isConnected) {
    return (
      <div className="relative">
        <Button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          variant={isCorrectChain ? "default" : "destructive"}
          className="gap-2 group"
        >
          <div className={`w-2 h-2 rounded-full ${isCorrectChain ? 'bg-green-400' : 'bg-orange-400'}`} />
          <span className="font-mono">{formatAddress(address as string)}</span>
          {!isCorrectChain && <AlertTriangle className="w-4 h-4" />}
          <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
        </Button>

        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsDropdownOpen(false)}
            />
            
            {/* Dropdown */}
            <Card className="absolute right-0 mt-2 w-80 z-50 border-0 shadow-xl">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Wallet Connected
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                        {formatAddress(address as string)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network Status */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Network
                    </span>
                    <Badge variant={isCorrectChain ? "default" : "destructive"} className="text-xs">
                      {isCorrectChain ? (
                        <Check className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {chain?.name || 'Unknown'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Chain ID: {chainId}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 space-y-3">
                  {!isCorrectChain && (
                    <Button
                      onClick={() => {
                        if (switchNetwork) {
                          switchNetwork(coreTestnet.id);
                          setIsDropdownOpen(false);
                        }
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Switch to Core Testnet
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => {
                      disconnect();
                      setIsDropdownOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
                  >
                    <Wallet className="w-4 h-4" />
                    Disconnect Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isPending}
        className="gap-2 group"
      >
        <Wallet className="w-4 h-4" />
        {isPending ? 'Connecting...' : 'Connect Wallet'}
        <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
      </Button>

      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsDropdownOpen(false)}
          />
          
          {/* Dropdown */}
          <Card className="absolute right-0 mt-2 w-80 z-50 border-0 shadow-xl">
            <CardContent className="p-0">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Connect Your Wallet
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Choose a wallet to get started
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Info */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-950">
                <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                  <Badge variant="secondary" className="text-xs">
                    Chain {coreTestnet.id}
                  </Badge>
                  <span>Core Testnet Required</span>
                </div>
              </div>

              {/* Wallet Options */}
              <div className="p-4 space-y-2">
                {connectors.map((connector) => (
                  <Button
                    key={connector.id}
                    onClick={() => {
                      if (connector.ready) {
                        connect({ connector, chainId: coreTestnet.id });
                        setIsDropdownOpen(false);
                      }
                    }}
                    disabled={!connector.ready}
                    variant="outline"
                    size="sm"
                    className="w-full justify-between text-left h-auto p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {connector.name}
                        </div>
                        {!connector.ready && (
                          <div className="text-xs text-red-500">
                            Not Available
                          </div>
                        )}
                      </div>
                    </div>
                    {connector.ready && (
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Error Display */}
      {error && (
        <Card className="absolute right-0 mt-2 w-80 z-50 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-red-800 dark:text-red-200 mb-1">
                  Connection Error
                </div>
                <div className="text-sm text-red-600 dark:text-red-400">
                  {error.message}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}