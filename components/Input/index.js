import { useState } from "react"

import { Container, Input, Label } from '../sharedstyles';

export default function ({label, type, value, onChange}){

    return (
        <Container flexDirection="column">
            <Label>{label}</Label>
            <Input type={type} value={value} onChange={ e => onChange(e.target) } />
        </Container>
    )
}