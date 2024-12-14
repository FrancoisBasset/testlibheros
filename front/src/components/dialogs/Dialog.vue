<template>
	<dialog class="flex flex-col gap-4 p-5 rounded-lg border-[1px] inset-0">
		<div class="text-end">
			<CloseButton @click="$emit('close')" />
		</div>
		<slot></slot>
	</dialog>
</template>

<script setup>
import CloseButton from '@/components/buttons/CloseButton.vue';
</script>
