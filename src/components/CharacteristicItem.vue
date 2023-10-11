<template>
    <li class="characteristic-item" v-if="isNormalCharacteristic">
        <strong>{{ capitalizedLabel }}:</strong> {{ content }}
    </li>

    <li class="characteristic-item has-points" v-if="isPointedCharacteristic">
        <strong>{{ capitalizedLabel }}:</strong>
        <div class="points">
            <div class="point marked" v-for="point in content" :key="point"></div>
            <div v-if="hasUnmarkedPoints" class="point" v-for="point in 5-content" :key="point"></div>
            <!-- <div class="point marked"></div>
            <div class="point marked"></div>
            <div class="point marked"></div>
            <div class="point marked"></div>
            <div class="point "></div> -->
        </div>
    </li>
</template>

<script>
import { computed } from 'vue'

export default {
    props: ['type', 'label', 'content'],
    setup(props) {
        const isNormalCharacteristic  = computed(() => props.type === 'normal')
        const isPointedCharacteristic = computed(() => props.type === 'pointed')

        const capitalizedLabel = computed(() => props.label[0].toUpperCase() + props.label.slice(1))
        const hasUnmarkedPoints = computed(() => isPointedCharacteristic.value && props.content != 5)

        return {
            isNormalCharacteristic,
            isPointedCharacteristic,
            capitalizedLabel,
            hasUnmarkedPoints
        }
    }
}
</script>

<style>
.characteristic-item.has-points {
    /* width: 80%; */
    display: grid;
    grid-template-columns: .5fr 1fr;
    align-items: center;
}

.has-points strong {
    white-space: nowrap;
}

.points {
    width: 100%;
    height: 12px;
    display: flex;
    gap: 8px;
}

.point {
    width: 60px;
    height: 10px;
    background-color: #E0E0E0;
    border-radius: 8px;
}

.marked {
    background-color: #544439;
}
</style>
