<template>
	<div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click.stop></div>

	<dialog class="flex flex-col gap-4 p-5 rounded-lg border-[1px] inset-0 shadow-2xl z-50">
		<div class="text-end">
			<CloseButton @click="$emit('close')" />
		</div>
		<slot></slot>
	</dialog>
</template>

<script setup>
import CloseButton from '@/components/buttons/CloseButton.vue';
</script>
