import React, { useEffect, useRef } from 'react'
import gsap from "gsap";

export default function HoverImg({img, pos = "top", children}){

    const el = useRef(null);

    useEffect(() => {

        let mousepos = {x: 0, y: 0};
        
        const getMousePos = (e) => {
            let posx = 0;
            let posy = 0;
            if (!e) e = window.event;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            }
            else if (e.clientX || e.clientY)    {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            
            return { x : posx, y : posy }
        };
        window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));


        class HoverImg {
            constructor(el) {
                let animProps = {
                    tx: {previous: 0, current: 0, amt: 0.08},
                    ty: {previous: 0, current: 0, amt: 0.08},
                    rotation: {previous: 0, current: 0, amt: 0.06}
                };

                this.DOM = {el: el};
                this.animProps = animProps;
                this.DOM.textInner = this.DOM.el.querySelector('.menu__item-textinner');
                this.DOM.reveal = document.createElement('div');
                this.DOM.reveal.className = 'hover-reveal';
                this.DOM.reveal.style.perspective = '1000px';
                this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
                this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
                this.DOM.revealInner.style.overflow = 'hidden';
                this.DOM.revealImage = this.DOM.revealInner.querySelector('.hover-reveal__img');
                this.DOM.el.parentElement.appendChild(this.DOM.reveal);

				// eslint-disable-next-line react-hooks/exhaustive-deps
                pos === "top" ? this.DOM.reveal.style.top = this.DOM.el.getBoundingClientRect().top - 24 + `px` : this.DOM.reveal.style.top = this.DOM.el.getBoundingClientRect().top + 28 + `px`
                
                this.DOM.reveal.style.left = this.DOM.el.getBoundingClientRect().left + `px`

                this.initEvents();
            }
            calcBounds() {
                this.bounds = {
                    el: this.DOM.el.getBoundingClientRect(),
                    reveal: this.DOM.reveal.getBoundingClientRect()
                };
            }
            initEvents() {
                this.mouseenterFn = (ev) => {
                    this.showImage();
                    this.firstRAFCycle = true;
                    this.loopRender();
                };
                this.mouseleaveFn = () => {
                    this.stopRendering();
                    this.hideImage();
                };
                
                this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
                this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
            }
            showImage() {
                gsap.killTweensOf(this.DOM.revealInner);
                gsap.killTweensOf(this.DOM.revealImage);
                
                this.tl = gsap.timeline({
                    onStart: () => {
                        this.DOM.reveal.style.opacity = this.DOM.revealInner.style.opacity = 1;
                        gsap.set(this.DOM.el, {zIndex: 1});
                    }
                })
                .to(this.DOM.revealInner, 0.8, {
                    ease: "expo.out", y: '0%', rotation: 0, opacity: 1, scale: 1,
                    startAt: {opacity: 0, y: '50%', rotation: -15, scale:0}
                })
                .to(this.DOM.revealImage, 0.2, {
                    ease: 'expo.out',
                    startAt: {rotation: 15, scale: 2},
                    rotation: 0,
                    scale: 1,
                }, 0);

            }
            hideImage() {
                gsap.killTweensOf(this.DOM.revealInner);
                gsap.killTweensOf(this.DOM.revealImage);

                this.tl = gsap.timeline({
                    onStart: () => { gsap.set(this.DOM.el, {zIndex: 1}); },
                    onComplete: () => { gsap.set(this.DOM.el, {zIndex: ''}); gsap.set(this.DOM.reveal, {opacity: 0}); }
                })
                .to(this.DOM.revealInner, 0.15, { ease: "sine.out", y: '-40%', rotation: 10, scale: 0.9, opacity: 0 })
                .to(this.DOM.revealImage, 0.15, { ease: "sine.out", rotation: -10, scale: 1.5 }, 0)
            }
            loopRender() {
                if ( !this.requestId ) {
                    this.requestId = requestAnimationFrame(() => this.render());
                }
            }
            stopRendering() {
                if ( this.requestId ) {
                    window.cancelAnimationFrame(this.requestId);
                    this.requestId = undefined;
                }
            }
            // translate the item as the mouse moves
            render() {
                const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;
                const lerp = (a, b, n) => (1 - n) * a + n * b;
                this.requestId = undefined;
                if ( this.firstRAFCycle ) this.calcBounds();
                this.animProps.tx.current = Math.abs(mousepos.x - this.bounds.el.left) - this.bounds.reveal.width/2;
                this.animProps.ty.current = Math.abs(mousepos.y - this.bounds.el.top) - this.bounds.reveal.height/2;
                this.animProps.rotation.current = map(Math.abs(mousepos.x - this.bounds.el.left),0,this.bounds.el.left+this.bounds.el.width,-20,20);
                this.animProps.tx.previous = this.firstRAFCycle ? this.animProps.tx.current : lerp(this.animProps.tx.previous, this.animProps.tx.current, this.animProps.tx.amt);
                this.animProps.ty.previous = this.firstRAFCycle ? this.animProps.ty.current : lerp(this.animProps.ty.previous, this.animProps.ty.current, this.animProps.ty.amt);
                this.animProps.rotation.previous = this.firstRAFCycle ? this.animProps.rotation.current : lerp(this.animProps.rotation.previous, this.animProps.rotation.current, this.animProps.rotation.amt);
                
                gsap.set(this.DOM.reveal, {
                    x: this.animProps.tx.previous,
                    y: this.animProps.ty.previous,
                    rotation: this.animProps.rotation.previous
                });
                this.firstRAFCycle = false;
                this.loopRender();
            }
        }
        
		// eslint-disable-next-line react-hooks/exhaustive-deps
        setTimeout(() => {new HoverImg(el.current);} , 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <span data-img={img} ref={el}>{children}</span>
}