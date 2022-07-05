import Form from '../../components/Form'
import { Container, Title } from '../../components/sharedstyles'

import { createECDH, createHash,  getPrivateKey, getPublicKey } from 'crypto'
import { useState } from 'react'

export default function() {

    const wallet_alice = createECDH('secp256k1')
    const wallet_bob = createECDH('secp256k1')

    const [aliceKeys, setAliceKeys] = useState({wallet: wallet_alice, secretKey: null, read: false})
    const [bobKeys, setBobKeys] = useState({wallet: wallet_bob, secretKey: null, read: false})

    function generatePrivateKey(wallet, value){

        const keyHash = createHash('sha256').update(value).digest('hex')

        if(wallet == 'alice'){
            wallet_alice.setPrivateKey(keyHash, 'hex')

            setAliceKeys({...aliceKeys, 
                wallet: wallet_alice,
                read: true
            })
        }else{
            wallet_bob.setPrivateKey(keyHash, 'hex')

            setBobKeys({...bobKeys,
                wallet: wallet_bob,
                read: true
            })
        }

        if(aliceKeys.read && bobKeys.read){
            let secret_alice = aliceKeys.wallet.computeSecret( bobKeys.wallet.getPublicKey('hex', 'compressed'), 'hex', 'hex');
            let secret_bob = bobKeys.wallet.computeSecret( aliceKeys.wallet.getPublicKey('hex', 'compressed'), 'hex', 'hex');

            setAliceKeys({...aliceKeys,
                secretKey: secret_alice,
                read: false
            })

            setBobKeys({...bobKeys,
                secretKey: secret_bob,
                read: false
            })
        }

    }

    return (
        <Container>
            <Form 
                title="Alice key" 
                {...aliceKeys}
                onRead={(value) => generatePrivateKey('alice', value)} 
            />
            <Form 
                title="Bob key" 
                {...bobKeys}
                onRead={(value)=> generatePrivateKey('bob', value)} 
            />
        </Container>
    )
}