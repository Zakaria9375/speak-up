<script lang="ts" setup>
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'
const dayjs = useDayjs()
dayjs.extend(relativeTime)
dayjs.extend(localizedDate)

const { isoTimestamp, act, forma } = defineProps({
  isoTimestamp: { type: String, required: true },
  act: { type: Boolean, required: false, default: false },
	forma: {type: String, default: 'llll'}
});

function fromNowDate(isoTimestamp: string) {
  const unixTimestamp = dayjs(isoTimestamp).unix();
  return dayjs.unix(unixTimestamp).fromNow();
}

function actualDate(isoTimestamp: string, forma: string) {
  const unixTimestamp = dayjs(isoTimestamp).unix();
  return dayjs.unix(unixTimestamp).format(forma);
}

function displayDate(act: boolean, forma: string) {
  if (act) {
    return actualDate(isoTimestamp, forma);
  } else {
    return fromNowDate(isoTimestamp);
  }
}
</script>

<template>
  <span :title="actualDate(isoTimestamp, forma)">
    {{ displayDate(act, forma) }}
  </span>
</template>

<style lang="scss">
span {
	@include zfont(1rem, 500, $gra2clr);
}
</style>

