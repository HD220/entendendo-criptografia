import { useState } from "react"
import { Container, Label, Title } from "../sharedstyles"
import Input from "../Input"

export default function({title, onRead, wallet, secretKey}) {

    const [material, setMaterial] = useState("")
    const [timeoutID, setTimeoutID] = useState(0)

    let privateKey = null
    let publicKey = null

    try {
        privateKey = wallet.getPrivateKey('hex', 'compressed')
    } catch (error) {
        console.log(error.message);
    }

    try {
        publicKey = wallet.getPublicKey('hex', 'compressed')
    } catch (error) {
        console.log(error.message);
    }
    
    function handleChange({value}){
        setMaterial(value)

        clearTimeout(timeoutID)
        setTimeoutID(setTimeout(() => onRead(value), 800))
        
    }

    return (
        <Container flexDirection="column">
            <Title>{title}</Title>
            <Container flexDirection="column">
                <Input label="Key Material" type="text" value={material} onChange={handleChange} />
                <Container flexDirection="column">
                    <Label>Private Key</Label>
                    <Label>{privateKey}</Label>    

                    <br/>

                    <Label>Public Key</Label>
                    <Label>{publicKey}</Label> 

                    <br/>

                    <Label>Secret Key</Label>
                    <Label>{secretKey}</Label>    
                </Container>
            </Container>
        </Container>
    )
}