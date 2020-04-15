import React from 'react';
import GameAlign from './GameAlign';
import GameInput from './GameInput';
import GameResult from './GameResult';

export default function GameSection() {
    return (
        <div>
            <h2>Alignment Game</h2>
            <GameInput/>
            <br/>
            <br/>
            <br/>
            <GameAlign/>
            <br/>
            <br/>
            <GameResult/>
        </div>
    );
}
