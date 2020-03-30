import React from 'react'
import PairAlignInput from './PairAlignInput'
import Matrix from '../Matrix/Matrix'

export default function PairAlignContent() {
    return (
        <div>
            <h2>PairAlign Mode</h2>
            <PairAlignInput/>
            <br/>
            <Matrix/>
        </div>
    )
}
