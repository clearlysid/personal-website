import React,  { useRef, useEffect  } from "react"
import App from "../layouts/app"
import { graphql, Link } from 'gatsby';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import Img from "gatsby-image";
import { TimelineMax, TweenMax } from "gsap/all"

export default function IndexPage({ data }) {

    const nameEl = useRef(null);
    const titleEl = useRef(null);
    const companyEl = useRef(null);

    SwiperCore.use([Mousewheel]);

    useEffect(() => {

        const getMousePos = (e) => {
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
            return { x : posx, y : posy }
        }
        
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
                this.positionElement = (ev) => {
                    const mousePos = getMousePos(ev);
                    const docScrolls = {
                        left : document.body.scrollLeft + document.documentElement.scrollLeft, 
                        top : document.body.scrollTop + document.documentElement.scrollTop
                    };
                    this.DOM.reveal.style.top = `${mousePos.y-75-docScrolls.top}px`;
                    this.DOM.reveal.style.left = `${mousePos.x-100-docScrolls.left}px`;
                };
                this.mouseenterFn = (ev) => {
                    this.positionElement(ev);
                    this.showImage();
                };
                this.mousemoveFn = ev => requestAnimationFrame(() => {
                    this.positionElement(ev);
                });
                this.mouseleaveFn = () => {
                    this.hideImage();
                };
                
                this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
                this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
                this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
            }
            showImage() {
                TweenMax.killTweensOf(this.DOM.revealInner);
                TweenMax.killTweensOf(this.DOM.revealImg);
    
                this.tl = new TimelineMax({
                    onStart: () => {
                        this.DOM.reveal.style.opacity = 1;
                        TweenMax.set(this.DOM.el, {zIndex: 2});
                    }
                })
                .add('begin')
                .add(new TweenMax(this.DOM.revealInner, 0.8, {
                    ease: "expo.out",
                    startAt: {opacity: 0, y: '50%', rotation: -15, scale:0},
                    y: '0%',
                    rotation: 0,
                    opacity: 0.8,
                    scale: 1
                }), 'begin')
                .add(new TweenMax(this.DOM.revealImg, 0.8, {
                    ease: "expo.out",
                    startAt: {rotation: 15, scale: 2},
                    rotation: 0,
                    scale: 1
                }), 'begin');
            }
            hideImage() {
                TweenMax.killTweensOf(this.DOM.revealInner);
                TweenMax.killTweensOf(this.DOM.revealImg);
    
                this.tl = new TimelineMax({
                    onStart: () => {
                        TweenMax.set(this.DOM.el, {zIndex: 2});
                    },
                    onComplete: () => {
                        TweenMax.set(this.DOM.el, {zIndex: ''});
                        TweenMax.set(this.DOM.reveal, {opacity: 0});
                    }
                })
                .add('begin')
                .add(new TweenMax(this.DOM.revealInner, 0.15, {
                    ease: "sine.out",
                    y: '-40%',
                    rotation: 10,
                    scale: 0.9,
                    opacity: 0
                }), 'begin')
                .add(new TweenMax(this.DOM.revealImg, 0.15, {
                    ease: "sine.out",
                    rotation: -10,
                    scale: 1.5
                }), 'begin')
            }
        }


       

        new HoverImg(nameEl.current);
        new HoverImg(titleEl.current);
        new HoverImg(companyEl.current);



    }, [])

    return (
        <App back={false}>
             <header className="header">
                <h2 className="site-header-text" >
                    {/* <span>Siddharth</span> builds prototypes as a <span>UX Engineer</span> Intern at <span>Headout.</span> Here’s what he’s been writing about lately... */}
                    <span data-img="1.jpg" ref={nameEl}>Siddharth</span> builds prototypes as a <span data-img="2.gif" ref={titleEl}>UX Engineer</span> Intern with the team at <span data-img="3.gif" ref={companyEl}>Headout.</span> Here’s what he’s been up to...
                </h2>
            </header>

            <Swiper spaceBetween={40} slidesPerView={"auto"} freeMode={true} mousewheel={true} loop={true}>
                {data.allNotionPageBlog.edges.map(edge => (
                    <SwiperSlide key={edge.node.slug}>
                        <Link className="article-card" to={`/blog/${edge.node.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')}`}>
                            <div key={edge.node.title} className="article-image">
                                <Img style={{height: `100%`, width: `100%` }} fluid={edge.node.imageNodes[0].localFile.childImageSharp.fluid} alt={edge.node.title}/>
                            </div>
                            <h4 className="article-title">{edge.node.title}</h4>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </App>
    );
}

export const query = graphql`
    query {
        allNotionPageBlog(filter: {isDraft: {eq: false}}, sort: {fields: [indexPage], order: ASC}) {
            edges {
                node {
                    title
                    slug
                    imageNodes {
                        localFile {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 2000) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;