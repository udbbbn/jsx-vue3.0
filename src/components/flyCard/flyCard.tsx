import { defineComponent, reactive, PropType, CSSProperties, h } from 'vue'
import './index.css'
import cn from 'classnames'

type CardType = 'img' | 'item'
type DragDirection = 'all' | 'horizontal' | 'vertical'

const defaultStyle = {
    borderRadius: '15px',
    position: 'absolute',
    backgroundColor: '#fff',
    overflow: 'hidden'
} as CSSProperties

function getDistance(x1, y1, x2, y2) {
    const x = Math.abs(x1 - x2)
    const y = Math.abs(y1 - y2)
    return Math.sqrt(x * x + y * y)
}

export default defineComponent({
    name: 'FlyCard',
    props: {
        cardType: {
            type: String as PropType<CardType>,
            default: 'img'
        },
        cardImgArray: {
            type: Array as PropType<string[]>,
            required: true
        },
        cardWidth: {
            type: Number,
            default: 200
        },
        cardLeftDiff: {
            type: Number,
            default: 10
        },
        cardHeight: {
            type: Number,
            default: 200
        },
        cardTopDiff: {
            type: Number,
            default: 10
        },
        dragDirection: {
            type: String as PropType<DragDirection>,
            default: 'all'
        },
        // 允许卡片飞的距离
        allowExecuteDistance: {
            type: Number,
            default: 0
        },
        // 卡片飞出去时的基础距离
        throwDistance: {
            type: Number,
            default: 500
        },
        // 图片重复
        repeat: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        const { cardType, cardWidth, cardLeftDiff, cardHeight, cardTopDiff, dragDirection, throwDistance, allowExecuteDistance, repeat } = props

        const state = reactive(props)

        const cardLength = state.cardImgArray.length

        const touchStart = reactive({ x: 0, y: 0 })
        const target = reactive({ x: 0, y: 0 })
        const infos = reactive({ animation: false })

        let cards = getCard(cardWidth, cardHeight, cardLeftDiff, cardTopDiff, cardLength)

        function onTouchStart({ touches }: TouchEvent) {
            touchStart.x = touches[0].clientX - target.x
            touchStart.y = touches[0].clientY - target.y
        }

        function onTouchMove({ touches }: TouchEvent) {
            const touch = touches[0]
            if (dragDirection === 'all' || dragDirection === 'horizontal') {
                target.x = touch.clientX - touchStart.x
            }
            if (dragDirection === 'all' || dragDirection === 'vertical') {
                target.y = touch.clientY - touchStart.y
            }
        }

        function onTouchEnd() {
            const distance = getDistance(0, 0, target.x, target.y)

            if (distance > allowExecuteDistance) {
                executeCardAnimation()
            }
        }

        function executeCardAnimation() {
            infos.animation = true
            const distanceY = target.y - 0
            const distanceX = target.x - 0
            const angle = Math.atan2(distanceY, distanceX)
            target.x = Math.cos(angle) * throwDistance
            target.y = Math.sin(angle) * throwDistance

            const keys = Object.keys(cards)

            cards[`card-${keys.length - 1}`] = { ...cards[`card-${keys.length - 2}`], opacity: 1 }
            cards[`card-2`] = { ...cards[`card-1`] }
            cards[`card-1`] = { ...cards[`card-0`] }

            setTimeout(() => {
                infos.animation = false
                target.x = 0
                target.y = 0
                resetCard()
            }, 400)
        }

        function resetCard() {
            if (repeat) {
                state.cardImgArray.push(state.cardImgArray.shift())
            } else {
                state.cardImgArray.shift()
            }
            cards = getCard(cardWidth, cardHeight, cardLeftDiff, cardTopDiff, cardLength)
        }

        return () => (
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`
                    }}
                >
                    {Object.values(cards).map((style: Record<string, any>, idx: number) => (
                        <div
                            class={cn('cardWrapper', {
                                animation: infos.animation
                            })}
                            style={{ ...defaultStyle, ...style, ...(idx === 0 ? { left: `${target.x}px`, top: `${target.y}px`, zIndex: 5 } : {}) }}
                            onTouchstart={idx === 0 ? onTouchStart : () => {}}
                            onTouchmove={idx === 0 ? onTouchMove : () => {}}
                            onTouchend={idx === 0 ? onTouchEnd : () => {}}
                        >
                            {cardType === 'img' && <img style={{ width: '100%', height: '100%' }} src={state.cardImgArray[idx]} alt="" />}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
})

function getCard(width, height, cardLeftDiff, cardTopDiff, cardLength) {
    const cards = {}
    const getCardProperty = level => ({
        width: width - cardLeftDiff * level + 'px',
        height: height - cardTopDiff * level + 'px',
        left: (cardLeftDiff / 2) * level + 'px',
        top: cardTopDiff * (level * 2) + 'px',
        zIndex: cardLength - level,
        opacity: level === cardLength - 1 && 0
    })
    new Array(cardLength).fill(1).forEach((el, idx) => {
        cards[`card-${idx}`] = getCardProperty(idx)
    })
    return cards
}
