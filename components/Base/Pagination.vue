<script lang="ts" setup>
	const { width } = useWindowSize();

	const { length, perPage } = defineProps({
		length: { type: Number, required: true },
		perPage: { type: Number, required: false, default: 10 },
	});
	const emit = defineEmits(["current"]);
	const items = ref(length);
	const currentPage = ref(1);
	const totalPages = ref(Math.ceil(items.value / perPage));
	const maxButtons = ref(Math.floor(width.value / 120));
	const displayPages = computed(() => {
		let pages = [];
		let halfRange = Math.floor(maxButtons.value / 2);

		let startPage = Math.max(currentPage.value - halfRange, 1);
		let endPage = Math.min(startPage + maxButtons.value - 1, totalPages.value);

		if (endPage - startPage < maxButtons.value - 1) {
			startPage = Math.max(endPage - maxButtons.value + 1, 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}
		return pages;
	});

	function updateOnLengthChange(newLength: number) {
		if (newLength > items.value && Number.isInteger(items.value / 10)) {
			totalPages.value = Math.ceil(newLength / perPage);
			items.value = newLength;
		} else if (
			newLength < items.value &&
			Number.isInteger((items.value - 1) / 10)
		) {
			totalPages.value = Math.ceil(newLength / perPage);
			currentPage.value = Math.max(totalPages.value, 1);
			items.value = newLength;
			emit("current", currentPage.value);
		} else {
			items.value = newLength;
		}
	}
	defineExpose({ updateOnLengthChange });
	function firstPage() {
		currentPage.value = 1;
		emit("current", currentPage.value);
	}
	function backPage() {
		if (currentPage.value > 1) {
			currentPage.value -= 1;
			emit("current", currentPage.value);
		}
	}
	function goToPage(page: number) {
		currentPage.value = page;
		emit("current", currentPage.value);
	}
	function nextPage() {
		if (currentPage.value < totalPages.value) {
			currentPage.value += 1;
			emit("current", currentPage.value);
		}
	}
	function lastPage() {
		currentPage.value = totalPages.value;
		emit("current", currentPage.value);
	}
</script>

<template>
	<div class="paginate">
		<div class="btns-paginate">
			<div class="s-btns">
				<button :disabled="currentPage === 1" @click="firstPage" class="s-btn">
					<fai class="fa-icon" icon="angles-left"></fai>
				</button>
				<button :disabled="currentPage <= 1" @click="backPage" class="s-btn">
					<fai class="fa-icon" icon="chevron-left"></fai>
				</button>
			</div>

			<button
				v-for="page in displayPages"
				:key="page"
				:disabled="currentPage === page"
				@click="goToPage(page)"
				:class="currentPage === page ? 'active' : ''"
				class="m-btn"
			>
				{{ page }}
			</button>
			<div class="s-btns">
				<button
					:disabled="currentPage >= totalPages"
					@click="nextPage"
					class="s-btn"
				>
					<fai class="fa-icon" icon="chevron-right"></fai>
				</button>
				<button
					:disabled="currentPage === totalPages"
					@click="lastPage"
					class="s-btn"
				>
					<fai class="fa-icon" icon="angles-right"></fai>
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.paginate {
		padding: 32px 0 16px;
		@include zflex;
		.btns-paginate {
			@include zflex;
			border-radius: 0.6rem;
			box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);
			border: 0.5px solid #a3abca;
		}
		button {
			border: none;
			cursor: pointer;
			border-radius: 4px;
			background: none;
			padding: 4px 8px;
			@include zfont(1.25rem, 500, #333);
			&:disabled {
				cursor: not-allowed;
			}
		}
		button.m-btn {
			margin: 12px 8px;
			&.active:disabled {
				background-color: $bluclr;
				color: #fff;
			}
		}
		.s-btns {
			margin: 12px 8px;
			button.s-btn {
				margin: 0;
				color: $bluclr;
				&:disabled {
					color: #ddd;
				}
			}
		}
	}
</style>
