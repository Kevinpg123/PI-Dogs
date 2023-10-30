import React from 'react'
import style from './About.module.css'

function About() {
    return (
        <div className={style.bigDiv}>
            <h1 className={style.h1}>Sobre el Creador</h1>
            <div className={style.secondDiv}>
                <div>
                    <img className={style.img} src='https://lh3.googleusercontent.com/drive-viewer/AK7aPaD8E2kX_mRbozkajE8OTDUma2z40euFO5r3YJS7rH1gdcKrBlSmp9Rlw_d5gJv6SqUyFEawWox8BUjP5HFomb6B5QN1=w1680-h911' />
                </div>
                <div className={style.textDiv}>
                    <p className={style.textP}>
                        Full Stack Developer | Javascript | CSS | React | Redux | Node.js | Sequelize
                        <br></br>
                        <br></br>
                        Me llamo Kevin Osmar Pauluk tengo 28 años soy Argentino

                        actualmente vivo en Posadas-Misiones y estoy terminando

                        mis estudios con la plataforma SoyHenry y éste proyecto

                        forma parte de mi práctica.

                        Ésta página esta diseñada para poder ver y buscar

                        las razas de perros que existen en el mundo, además

                        de poder agregar nuevas razas a la base de datos

                        para poder verlas posteriormente.

                        Espero que sea de su agrado la página y gracias por la visita.
                        <br></br>
                        <br></br>
                        Datos de contacto:
                        <a className={style.links} target="_blank" href='https://github.com/Kevinpg123'>    GitHub</a>
                        <a className={style.links} target="_blank" href='https://www.linkedin.com/in/kevin-osmar-pauluk-373676261/'>    LinkedIn</a>
                    </p>

                </div>
            </div>

        </div>
    )
}

export default About