app.controller("currenciesCtrl", function($scope, $rootScope, $location) {
    $scope.cryptos = [];

    $scope.priceUpdate = async function() {
        await axios.get(`${$rootScope.serverUrl}/db/get_crypto_data/btc`).then(res =>{
            const cryptoData = res.data.data.data.BTC
            
            $scope.cryptos.push({ 
                imageName: 'bitcoin',
                name: 'Bitcoin',
                price: Math.round(cryptoData.quote.USD.price).toFixed(2), 
                marketcap:  Math.round(cryptoData.quote.USD.market_cap).toFixed(2), 
                volume:  Math.round(cryptoData.quote.USD.volume_24h).toFixed(2),
                totalSupply: cryptoData.max_supply 
            })

            
        })

        await axios.get(`${$rootScope.serverUrl}/db/get_crypto_data/ada`).then(res =>{
            const cryptoData = res.data.data.data.ADA
            
            $scope.cryptos.push({ 
                imageName: 'cardano',
                name: 'cardano',
                price: cryptoData.quote.USD.price.toFixed(4), 
                marketcap: cryptoData.quote.USD.market_cap.toFixed(2), 
                volume: cryptoData.quote.USD.volume_24h.toFixed(2),
                totalSupply: cryptoData.max_supply 
            })

            
        })
        await axios.get(`${$rootScope.serverUrl}/db/get_crypto_data/eth`).then(res =>{
            const cryptoData = res.data.data.data.ETH
            
            $scope.cryptos.push({ 
                imageName: 'ethereum',
                name: 'ethereum',
                price: cryptoData.quote.USD.price.toFixed(2), 
                marketcap: cryptoData.quote.USD.market_cap.toFixed(2), 
                volume: cryptoData.quote.USD.volume_24h.toFixed(2),
                totalSupply: cryptoData.max_supply 
            })

            
        })
        await axios.get(`${$rootScope.serverUrl}/db/get_crypto_data/sol`).then(res =>{
            const cryptoData = res.data.data.data.SOL
            
            $scope.cryptos.push({ 
                imageName: 'solana',
                name: 'solana',
                price: cryptoData.quote.USD.price.toFixed(2), 
                marketcap: cryptoData.quote.USD.market_cap.toFixed(2), 
                volume: cryptoData.quote.USD.volume_24h.toFixed(2),
                totalSupply: cryptoData.max_supply 
            })

            
        })

        await axios.get(`${$rootScope.serverUrl}/db/get_crypto_data/xrp`).then(res =>{
            const cryptoData = res.data.data.data.XRP
            
            $scope.cryptos.push({ 
                imageName: 'xrp',
                name: 'xrp',
                price: cryptoData.quote.USD.price.toFixed(4), 
                marketcap: cryptoData.quote.USD.market_cap.toFixed(2), 
                volume: cryptoData.quote.USD.volume_24h.toFixed(2),
                totalSupply: cryptoData.max_supply 
            })

            
        })

        await axios.get(`${$rootScope.serverUrl}/db/get_crypto_data/doge`).then(res =>{
            const cryptoData = res.data.data.data.DOGE
            
            $scope.cryptos.push({ 
                imageName: 'dogecoin',
                name: 'doge',
                price: cryptoData.quote.USD.price.toFixed(4), 
                marketcap: cryptoData.quote.USD.market_cap.toFixed(2), 
                volume: cryptoData.quote.USD.volume_24h.toFixed(2),
                totalSupply: cryptoData.max_supply 
            })

            
        })

        await axios.get(`${$rootScope.serverUrl}/db/get_crypto_data/avax`).then(res =>{
            const cryptoData = res.data.data.data.AVAX
            
            $scope.cryptos.push({ 
                imageName: 'avalanche',
                name: 'avalanche',
                price: cryptoData.quote.USD.price.toFixed(3), 
                marketcap: cryptoData.quote.USD.market_cap.toFixed(2), 
                volume: cryptoData.quote.USD.volume_24h.toFixed(2),
                totalSupply: cryptoData.max_supply
            })

            
        })

        await axios.get(`${$rootScope.serverUrl}/db/get_crypto_data/ltc`).then(res =>{
            const cryptoData = res.data.data.data.LTC
            
            $scope.cryptos.push({ 
                imageName: 'litecoin',
                name: 'litecoin',
                price: cryptoData.quote.USD.price.toFixed(2), 
                marketcap: cryptoData.quote.USD.market_cap.toFixed(2), 
                volume: cryptoData.quote.USD.volume_24h.toFixed(2),
                totalSupply: cryptoData.max_supply 
            })

            
        })
        
        await axios.get(`${$rootScope.serverUrl}/db/get_crypto_data/link`).then(res =>{
            const cryptoData = res.data.data.data.LINK
            
            $scope.cryptos.push({ 
                imageName: 'chainlink',
                name: 'chainlink',
                price: cryptoData.quote.USD.price.toFixed(2), 
                marketcap: cryptoData.quote.USD.market_cap.toFixed(2), 
                volume: cryptoData.quote.USD.volume_24h.toFixed(2),
                totalSupply: cryptoData.max_supply 
            })

            
        })

        await axios.get(`${$rootScope.serverUrl}/db/get_crypto_data/usdt`).then(res =>{
            const cryptoData = res.data.data.data.USDT
            
            $scope.cryptos.push({ 
                imageName: 'tether',
                name: 'TETHER USD',
                price: cryptoData.quote.USD.price.toFixed(5), 
                marketcap: cryptoData.quote.USD.market_cap.toFixed(2), 
                volume: cryptoData.quote.USD.volume_24h.toFixed(2),
                totalSupply: cryptoData.max_supply 
            })

           
        })

        $scope.$apply();
    }


    $scope.priceUpdate()

    console.log($scope.cryptos)
});