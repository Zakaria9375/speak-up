interface MyNoti {
	message: string | undefined;
	type: "success" | "error" | "info";
	$id: string;
}

const notis = reactive<MyNoti[]>([]);
export function useNotifications() {
	function addNoti(m: string, t: "s" | "e" | "i", error: string = "") {
		const type = t === "s" ? "success" : t === "e" ? "error" : "info";
		const err = computed(() => {
			if(error) {
				if (error.startsWith("AppwriteException:")) {
					return error.replace("AppwriteException:", "").trim();
				}

			}
		})
		const msg = computed(() => {
			switch (t) {
				case "s":
					return `${m} ✅`;
				case "e":
					return `${m}: ${err.value} ❌`;
				case "i":
					return `${m} ℹ️`;
			}
		});
		const notification: MyNoti = {
			message: msg.value,
			type,
			$id: Date.now().toString(),
		};
		notis.push(notification);
		if (t === "e") {
			setTimeout(() => {
				removeNoti(notification.$id);
			}, 7500);
		} else {
			setTimeout(() => {
				removeNoti(notification.$id);
			}, 3000);
		}
	}
	function removeNoti(id: string) {
		const idx = notis.findIndex((i) => i.$id === id);
		notis.splice(idx, 1);
	}
	return {
		notis,
		addNoti,
		removeNoti,
	};
}
