<template>
	<div class="flex flex-col justify-between h-screen">
		<div>
			<CloseButton @click="$emit('panelClosed')" />
			<PanelBoardForm />
		</div>
		<LogoutButton />
	</div>
</template>

<script setup>
import CloseButton from '@/components/buttons/CloseButton.vue';
import LogoutButton from '@/components/buttons/LogoutButton.vue';
import PanelBoardForm from '@/components/PanelBoardForm.vue';
</script>
