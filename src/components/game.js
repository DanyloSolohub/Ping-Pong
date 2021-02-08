import React, {useEffect, useState} from "react";
import RecordTable from "./RecordTable";
import './gameCss.css'


export default function Game(props) {


    function collides(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y;
    }

    const [repel, SetRepel] = useState(0)
    const [record, SetRecord] = useState(0)
    const [nextX, SetLvlX] = useState(1)
    const [nextY, SetLvlY] = useState(1)

    const field = {
        width: 800,
        height: 400
    }

    const topWall = {
        width: field.width,
        height: 20,
        x: 0,
        y: -20
    }
    const bottomWall = {
        width: field.width,
        height: 20,
        x: 0,
        y: 400
    }
    const leftPlatform = {
        width: 20,
        height: 100,
        x: 0,
        y: 0,
        repel: 0
    }
    const rightPlatform = {
        width: 20,
        height: 100,
        x: 780,
        y: 0
    }


    const ball = {
        width: 20,
        height: 20,
        x: field.width / 2,
        y: field.height / 2,
        collidesX: false,
        collidesY: false
    }

    const listener = function (e) {
        const leftPlatformCss = document.getElementById('leftPlatform')

        if (e.pageY - 150 < 0) {
            leftPlatformCss.style.top = '0px'
        } else if (e.pageY + 150 > 600) {
            leftPlatformCss.style.top = '300px'
            leftPlatform.y = 300

        } else {
            leftPlatformCss.style.top = e.pageY - 150 + 'px'
            leftPlatform.y = e.pageY - 150
        }
    }

    function move() {
        document.addEventListener('mousemove', listener)
    }


    useEffect(() => {
        const ballStart = document.getElementById('ball')
        const rightPlatformCss = document.getElementById('rightPlatform')
        let speedX = 1
        let speedY = 1


        setInterval(() => {

            if (ball.x <= 0 || ball.x >= 800) {
                if (ball.x <= 0) {
                    SetRepel(0)
                    SetLvlX(1)
                    SetLvlY(1)
                    speedY = 1
                    speedX = 1
                    leftPlatform.repel = 0
                    ballStart.style.background = 'orchid'
                }
                ballStart.style.top = '200px'
                ballStart.style.left = '400px'
                ball.x = field.width / 2
                ball.y = field.height / 2


            } else {
                if (collides(ball, leftPlatform) === true) {
                    SetRepel((prev) => prev + 1)

                    leftPlatform.repel += 1
                    if (leftPlatform.repel % 3 === 0 && leftPlatform.repel !== 0) {
                        speedY = speedY + 1
                        speedX = speedX * 1.5
                        SetLvlY(speedY)
                        SetLvlX(speedX)
                        ballStart.style.background = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
                    }
                    ball.collidesX = true
                    ball.x = ball.x + speedX
                } else if (ball.collidesX === false) {
                    ball.x = ball.x - speedX
                } else if (ball.collidesX === true) {
                    ball.x = ball.x + speedX


                }
                if (collides(ball, rightPlatform) === true) {
                    ball.collidesX = false
                }
                ballStart.style.left = ball.x + 'px'
            }

            if (collides(ball, bottomWall) === true) {
                ball.collidesY = true
                ball.y = ball.y - speedY
                rightPlatform.y = ball.y
            } else if (ball.collidesY === false) {
                ball.y = ball.y + speedY
                rightPlatform.y = ball.y
            } else if (ball.collidesY === true) {
                ball.y = ball.y - speedY
                rightPlatform.y = ball.y
            }
            if (collides(ball, topWall)) {
                ball.collidesY = false
            }
            ballStart.style.top = ball.y + 'px'
            rightPlatform.y = ball.y - 50
            if (rightPlatform.y > 300) {
                rightPlatformCss.style.top = '300px'
            } else if (rightPlatform.y < 0) {
                rightPlatformCss.style.top = '0px'
            } else {
                rightPlatformCss.style.top = rightPlatform.y + 'px'
            }
        }, 10)
    }, [])


    if (repel > record && repel !== 0) {
        SetRecord(repel)
        if (+localStorage.getItem('record') <= record){
            localStorage.setItem('record', (record+1).toString())
        }
    }

    return (

        <div className={'main'}>
            <div className={'counter'}><span
                className={'score'}> points: {repel} speed: {Math.round(Math.hypot(nextY, nextX))} </span></div>
            <div className={'fieldWW'}>
                <div id={'topWall'}>
                </div>
                <div id={'field'}>
                    <div id={'leftField'}>
                        <div id={'leftMoveZone'}>
                            <div onMouseEnter={move} id={'leftPlatform'}>1</div>
                        </div>
                    </div>
                    <div className={'ballStart'}>
                        <div id={'ball'}>
                            <div style={{fontWeight: 'bold'}}>{nextY}</div>
                        </div>
                    </div>
                    <div id={'rightField'}>
                        <div id={'rightMoveZone'}>
                            <div id={'rightPlatform'}>2</div>
                        </div>
                    </div>
                </div>
                <div id={'bottomWall'}>
                </div>
            </div>
            <div>
                <RecordTable player={props.item} record={record}/>
            </div>
        </div>
    );
}
