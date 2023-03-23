import React, { useState, useEffect } from 'react'
import { slideData } from '../utils/data'
import '../style.css'

const Slide = () => {
    const [slide] = useState(slideData)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const lastIndex = slide.length - 1;
        if (index < 0) {
            setIndex(lastIndex)
        }
        if (index > lastIndex) {
            setIndex(0)
        }
    }, [index, slide])

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1)
        }, 8000);
        return () => {
            clearInterval(slider)
        }
    }, [index])

    return (
        <section className='section'>
            <div className='section-center'>
                {slide.map((item, indexSlide) => {
                    const { id, image, recycle, doNotRecycle, bg, title } = item
                    let position = "nextSlide"
                    if (indexSlide === index) {
                        position = "activeSlide"
                    }
                    if (indexSlide === index - 1 || (index === 0 && indexSlide === slide.length - 1)) {
                        position = "lastSlide"
                    }
                    return (
                        <article style={{ background: bg }} className={`${position} article`} key={id}>
                            <div className='info-recycle'>
                                <h1 className='titleslide'>{title}</h1>
                                <p className='recycleinfoslide'>{recycle}</p>
                                <hr></hr>
                                <p className='donotrecycleinfoslide'>{doNotRecycle}</p>
                            </div>

                            <img className='recycle-image' src={image} alt="" />

                        </article>
                    )
                })}
                <button className='prev' onClick={() => setIndex(index - 1)}>&lt;</button>
                <button className='next' onClick={() => setIndex(index + 1)}>&gt;</button>
            </div>
        </section>
    )
}

export default Slide