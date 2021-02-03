import { defineComponent, reactive, PropType, CSSProperties, ref } from 'vue'
import cn from 'classnames'

type CardType = 'img' | 'item'
type DragDirection = 'all' | 'horizontal' | 'vertical'

const defaultStyle = {
    borderRadius: '15px',
    position: 'absolute',
    backgroundColor: '#fff',
    overflow: 'hidden'
} as CSSProperties

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
        cardLength: {
            type: Number,
            default: 3
        },
        dragDirection: {
            type: String as PropType<DragDirection>,
            default: 'horizontal'
        }
    },
    setup(props, context) {
        const { cardType, cardImgArray, cardWidth, cardLeftDiff, cardHeight, cardTopDiff, cardLength, dragDirection } = props

        // check props valid
        if (cardImgArray?.length !== cardLength) {
            throw new Error('cardImgArray length must equal cardLength')
        }
        if (cardType === 'img' && !cardImgArray.length) {
            throw new Error(`if cardType equal 'img', cardLength must be have`)
        }

        const touchStart = reactive({ x: 0, y: 0 })
        const target = reactive({ x: 0, y: 0 })

        const cards = getCard(cardWidth, cardHeight, cardLeftDiff, cardTopDiff, cardLength)

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

        return () => (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div style={{ position: 'absolute', left: '50%', right: '50%', transform: 'translate(-50%, -50%)' }}>
                    {Object.values(cards).map((el: Record<string, any>, idx: number) => (
                        <div
                            style={{ ...defaultStyle, ...el, ...(idx === 0 ? { left: `${target.x}px`, top: `${target.y}px` } : {}) }}
                            onTouchstart={idx === 0 ? onTouchStart : () => {}}
                            onTouchmove={idx === 0 ? onTouchMove : () => {}}
                        >
                            <img style={{ width: '100%', height: '100%' }} src={cardImgArray[idx]} alt="" />
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
        zIndex: cardLength - level
    })
    new Array(cardLength).fill(1).forEach((el, idx) => {
        cards[`card-${idx}`] = getCardProperty(idx)
    })
    return cards
}
