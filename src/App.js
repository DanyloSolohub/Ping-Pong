import React, {useEffect} from "react";
import './App.css'

export default function App() {

    function collides(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y;
    }

    const upWall = {
        width: 800,
        height: 20,
        x: 0,
        y: 0
    }
    const downWall = {
        width: 800,
        height: 20,
        x: 0,
        y: 420
    }

    const field = {
        width: 800,
        height: 400,
        background: 'grey'
    }
    const leftPlatform = {
        width: 20,
        height: 100,
        x: 0,
        y: 0
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
        if (e.pageY - 50 < 0) {
            leftPlatformCss.style.top = '0px'
        } else if (e.pageY + 50 > 400) {
            leftPlatformCss.style.top = '300px'
            leftPlatform.y = 300

        } else {
            leftPlatformCss.style.top = e.pageY - 50 + 'px'
            leftPlatform.y = e.pageY - 50
        }
    }

    function move() {
        document.addEventListener('mousemove', listener)
    }

    function stop() {
        document.removeEventListener('mousemove', listener)
    }


    useEffect(() => {
        const ballStart = document.getElementById('ball')
        const rightPlatformCss = document.getElementById('rightPlatform')

        setInterval(() => {

            if (ball.x === 0 || ball.x === 800) {
                ballStart.style.top = '220px'
                ballStart.style.left = '400px'
                ball.x = field.width / 2
                ball.y = (field.height + 20) / 2

            } else {
                if (collides(ball, leftPlatform) === true) {
                    ball.collidesX = true
                    ball.x = ball.x + 10
                } else if (ball.collidesX === false) {
                    ball.x = ball.x - 10

                } else if (ball.collidesX === true) {
                    ball.x = ball.x + 10

                }
                if (collides(ball, rightPlatform) === true) {
                    ball.collidesX = false
                }
                ballStart.style.left = ball.x + 'px'
            }
            if (ball.y === 0 || ball.y === 420) {
                ballStart.style.top = (field.height + 20) / 2 + 'px'
                ball.y = (field.height + 20) / 2

            } else {
                if (collides(ball, downWall) === true) {
                    ball.collidesY = true
                    ball.y = ball.y - 10
                    rightPlatform.y = ball.y
                } else if (ball.collidesY === false) {
                    ball.y = ball.y + 10
                    rightPlatform.y = ball.y
                } else if (ball.collidesY === true) {
                    ball.y = ball.y - 10
                    rightPlatform.y = ball.y
                }
                if (collides(ball, upWall)) {
                    ball.collidesY = false
                }
                ballStart.style.top = ball.y + 'px'
                rightPlatform.y = ball.y - 50
                if (rightPlatform.y  > 320) {
                    rightPlatformCss.style.top = '320px'
                } else if (rightPlatform.y < 0) {
                    rightPlatformCss.style.top = '0px'
                } else {
                    rightPlatformCss.style.top = rightPlatform.y + 'px'

                }

            }
        }, 30)

    }, [])


    return (
        <div>
            <div id={'upWall'}>
            </div>
            <div id={'field'}>
                <div id={'leftField'}>
                    <div id={'leftMoveZone'}>
                        <div onMouseEnter={move} onClick={stop} id={'leftPlatform'}>1</div>
                    </div>
                </div>
                <div className={'ballStart'}>
                    <div id={'ball'}>
                        1
                    </div>
                </div>
                <div id={'rightField'}>
                    <div id={'rightMoveZone'}>
                        <div id={'rightPlatform'}>2</div>

                    </div>

                </div>
            </div>
            <div id={'downWall'}>

            </div>

        </div>
    );
}      
