import React, { useEffect, useState } from 'react'
import './Cricket.css'

function Cricket() {

    const [gameButtonStatus, setGameButtonStatus] = useState(true)
    const [playerName, setPlayerName] = useState({})
    const [playerList, setPlayerList] = useState([])

    const [time, setTime] = useState(false)
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    let timer;

    useEffect(() => {

        if (time) {
            timer = setInterval(() => {
                setSeconds(seconds + 1);

                if (seconds === 59) {
                    setMinutes(minutes + 1);
                    setSeconds(0);
                }
            }, 1000);


            return () => clearInterval(timer)

            
        }
    })

    const onButtonStart = () => {
        setGameButtonStatus(!gameButtonStatus)
        setTime(!time)
    }


    const onButtonReset = () => {
        setTime(!time)
        setMinutes(0);
        setSeconds(0);
        setGameButtonStatus(!gameButtonStatus)
        setPlayerList([])
    }


    const onAddPlayer = () => {
        setPlayerList([...playerList, { name: playerName, playerTime: seconds}])
        //console.log(playerList);
    }

    const onHandleEvent = (e) => {
        //console.log({name: e.target.value});
        setPlayerName(e.target.value)
    }



    return (
        <div>

            <h1>Player List Game</h1>
            <div>
                <input type="text"
                    placeholder="Enter name"

                    onChange={(e) => onHandleEvent(e)}
                />
                <button onClick={() => onAddPlayer()} className='button-style'>ADD</button>
            </div>

            {/* list */}

            {playerList.length === 0 ? <h4>No data</h4> :
                playerList.map((item, index) => <li><h4 className='text-style'>{index+1}. {item.name}</h4> &nbsp;
                <h3 className='text-style'>{item.playerTime}s   </h3>
                </li>)
            }

            {/* timer */}

            <div className='margin'>
                <h3 className='text-style'>Timer: </h3>
                <h3 className='text-style'>{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}   </h3>
                {gameButtonStatus
                    ? <button onClick={() => onButtonStart()} className='button-style'>Start</button>
                    : <button onClick={() => onButtonReset(!gameButtonStatus)} className='reset-button-style'>Reset</button>
                }
            </div>

        </div>
    )
}

export default Cricket