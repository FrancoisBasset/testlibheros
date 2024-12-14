<template>
	<div>
		<HomeMenu v-if="session.user === null" />
		<div v-else class="flex flex-row">
			<div v-if="openPanel" class="w-2/12 h-screen bg-gray-100 rounded-lg">
				<Panel @panelClosed="openPanel = false" />
			</div>
			<div v-else class="w-8 h-screen">
				<button @click="openPanel = true" class="w-8 h-8">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12.08,4.08L20,12L12.08,19.92L10.67,18.5L16.17,13H2V11H16.17L10.67,5.5L12.08,4.08M20,12V22H22V2H20V12Z" /></svg>
				</button>
			</div>
			<div class="w-10/12">
				
			</div>
		</div>
	</div>
</template>

<script setup>
import HomeMenu from '@/components/HomeMenu.vue';
import Panel from '@/components/Panel.vue';
</script>

<script>
import useSession from '@/stores/session';

export default {
	data: () => ({
		session: useSession(),
		openPanel: true
	})
}
</script>