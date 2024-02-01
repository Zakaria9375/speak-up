<script setup>
	const dataStore = useDataStore();
	const { width, height: ph } = useWindowSize();
	const scrollH = ref(document.documentElement.scrollHeight);
	const { refValue, toggle } = useToggle();
	const navControl = computed(() => {
		return refValue.value && width.value ? "navShow" : "navHide";
	});
	const categories = computed(() => dataStore.categories);
	onMounted(() => {
		const appWrite = useAppWrite();
		if (!dataStore.categories.value) {
			dataStore.getCategories();
		}
		const channels = [
			"databases.appData.collections.categories.documents",
			"databases.appData.collections.forums.documents",
			"databases.appData.collections.threads.documents",
		];
		appWrite.client.subscribe(channels, () => dataStore.getCategories());
	});
</script>

<template>
	<div class="main-nav">
		<div class="nav-head">
			<div v-show="width <= 850 ? true : false" class="icon">
				<fai
					:icon="refValue ? 'circle-xmark' : 'bars'"
					class="fa-icon"
					@click="toggle"
				/>
			</div>
			<!-- <div class="mycrumbs">
				<AppBreadCrumb />
			</div> -->
		</div>

		<nav :class="navControl">
			<div class="home">
				<NuxtLink to="/dashboard">
					<fai icon="house" class="fa-icon"></fai>Home
				</NuxtLink>
			</div>
			<ul class="categories" v-for="category in categories" :key="category.id">
				<li class="category">
					<NuxtLink class="a-c" :to="`/dashboard/category/${category.$id}`">
						<fai icon="layer-group" class="fa-icon"></fai>
						{{ category.name }}
					</NuxtLink>
					<ul class="forums" v-for="forum in category.forums" :key="forum.$id">
						<li class="forum">
							<NuxtLink :to="`/dashboard/forum/${forum.$id}`">
								<fai icon="folder" class="fa-icon"></fai>
								{{ forum.name }}
							</NuxtLink>
							<span>{{ forum.threads.length }}</span>
						</li>
					</ul>
				</li>
			</ul>
			<div class="users">
				<NuxtLink to="/dashboard/profile">
					<fai icon="users" class="fa-icon"></fai>Users
				</NuxtLink>
			</div>
		</nav>
	</div>
</template>

<style lang="scss">
	.main-nav {
		padding: 0 8px 16px;
		@include more(850px) {
			min-height: calc(100dvh - 150px);
			max-height: v-bind(scrollH);
		}
		.nav-head {
			@include zflex;
			// padding-top: 24px;
			justify-content: flex-start;
			gap: 8px;
			.mycrumbs {
				padding-left: 16px;
			}
			.icon {
				padding: 16px;
				transition: all 0.2s ease;
				cursor: pointer;
				.fa-icon {
					width: 28px;
					height: 28px;
				}
			}
		}
		nav {
			padding: 0 8px;
			transition: all 0.2s ease;
			@include zflex(column, nowrap, center, flex-start);
			.fa-icon {
				padding-right: 8px;
			}
			ul,
			li {
				padding: 0;
			}
			div.home {
				padding: 8px 12px 8px;
				a {
					@include zfont(1.2rem, 500, #082c49);
				}
			}
			div.users {
				padding: 16px 12px 8px;
				a {
					@include zfont(1.2rem, 500, #082c49);
				}
			}
			ul.categories {
				width: 100%;

				li.category {
					text-transform: capitalize;
					padding: 16px 0 0 16px;
					a {
						@include zfont(1.2rem, 500, #082c49);
						padding-left: 16px;
					}
					a.a-c {
						display: block;
						padding-bottom: 24px;
					}
					ul.forums {
						li.forum {
							@include zflex(row, nowrap, space-between);
							a {
								@include zfont(1.125rem, 500, #13436a);
							}
						}
						text-transform: capitalize;
						padding: 0 0 16px 32px;
					}
				}
			}
		}
		nav {
			@include more(850px) {
				width: $navW;
				min-width: $navW;
				padding-top: 16px;
			}
			@include less(850px) {
				max-height: 0;
				width: 100%;
				overflow: hidden;
				padding: 0 12px;
			}
		}

		nav.navShow {
			max-height: 1000px;
		}
	}
</style>
