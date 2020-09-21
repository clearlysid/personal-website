import React, { useEffect, useRef } from 'react'
import { TimelineLite, TweenLite } from "gsap/all"

export default function ImageOnHover({img, children}){

    const el = useRef(null);

    useEffect(() => {
        class HoverImg {
            constructor(el) {
                this.DOM = {el: el};
                this.DOM.reveal = document.createElement('div');
                this.DOM.reveal.className = 'hover-reveal';
                this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
                this.DOM.el.parentElement.appendChild(this.DOM.reveal);
                this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
                this.DOM.revealInner.style.overflow = 'hidden';
                this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
                this.initEvents();
            }
            initEvents() {
                this.positionElement = (e) => {
                    let posx = 0;
                    let posy = 0;

                    if (!e) e = window.event;
                    if (e.pageX || e.pageY) {
                        posx = e.pageX;
                        posy = e.pageY;
                    }
                    else if (e.clientX || e.clientY) 	{
                        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    }

                    const mousePos = { x : posx, y : posy }
                    const docScrolls = {
                        left : document.body.scrollLeft + document.documentElement.scrollLeft, 
                        top : document.body.scrollTop + document.documentElement.scrollTop
                    };

                    const x = mousePos.x-66-docScrolls.left;
                    const y = mousePos.y-75-docScrolls.top;
                    
                    this.DOM.reveal.style.left = `${x}px`;
                    this.DOM.reveal.style.top = `${y}px`;
                };
                
                this.mouseenterFn = (ev) => {
                    this.positionElement(ev);
                    this.showImage();
                };
                this.mousemoveFn = ev => requestAnimationFrame(() => this.positionElement(ev));
                this.mouseleaveFn = () => this.hideImage();
             
                this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
                this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
                this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
            }
            showImage() {
                TweenLite.killTweensOf(this.DOM.revealInner);
                TweenLite.killTweensOf(this.DOM.revealImg);

                this.tl = new TimelineLite({
                    onStart: () => { this.DOM.reveal.style.opacity = 1; TweenLite.set(this.DOM.el, {zIndex: 1000}); }
                })
                .add('begin')
                .add(new TweenLite(this.DOM.revealInner, 0.8, {
                    ease: "expo.out", y: '0%', rotation: 0, opacity: 1, scale: 1,
                    startAt: {opacity: 0, y: '50%', rotation: -15, scale:0}
                }), 'begin')
                .add(new TweenLite(this.DOM.revealImg, 0.8, { ease: "expo.out", startAt: {rotation: 15, scale: 2}, rotation: 0, scale: 1 }), 'begin');

            }
            hideImage() {
                TweenLite.killTweensOf(this.DOM.revealInner);
                TweenLite.killTweensOf(this.DOM.revealImg);

                this.tl = new TimelineLite({
                    onStart: () => TweenLite.set(this.DOM.el, {zIndex: 999}),
                    onComplete: () => { TweenLite.set(this.DOM.el, {zIndex: ''}); TweenLite.set(this.DOM.reveal, {opacity: 0});}
                })
                .add('begin')
                .add(new TweenLite(this.DOM.revealInner, 0.15, { ease: "sine.out", y: '-40%', rotation: 10, scale: 0.9, opacity: 0 }), 'begin')
                .add(new TweenLite(this.DOM.revealImg, 0.15, { ease: "sine.out", rotation: -10, scale: 1.5 }), 'begin')

            }
        }

        new HoverImg(el.current);
    }, [])

    return <span data-img={img} ref={el}>{children}</span>
}