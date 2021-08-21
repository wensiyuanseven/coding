<script>
import { Info } from 'vant'
import { addUnit } from '../utils'

export default {
    name: 'dam-icon',
    components: {
        [Info.name]: Info
    },
    props: {
        name: {
            type: String,
            required: true
        },
        color: String,
        size: [String, Number],
        tag: {
            type: String,
            default: 'i'
        },
        dot: Boolean,
        badge: [Number, String]
    },
    mounted() {},
    methods: {
        emitClick() {
            this.$emit('click')
        }
    },
    render() {
        const { tag } = this
        return (
            <tag
                on-click={this.emitClick}
                class={['van-icon', `van-icon-${this.name}`]}
                style={{
                    color: this.color,
                    fontSize: addUnit(this.size)
                }}
            >
                {this.$slots.default}
                <Info dot={this.dot} info={this.badge} />
            </tag>
        )
    }
}
</script>
