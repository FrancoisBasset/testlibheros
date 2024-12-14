<template>
	<div class="flex flex-col bg-gray-200 border-[1px] border-black rounded gap-2 p-2 w-64 cursor-pointer" @click="">
		<text>{{ task.title }}</text>

		<text class="text-xs">
			{{ task.description.substring(0, 50) }}
			<span v-if="task.description.length > 50">...</span>
		</text>

		<div class="flex flex-row gap-1">
			<text class="text-xs bg-blue-500 text-white rounded p-1">{{ task.duedate }}</text>

			<text class="text-xs bg-blue-500 text-white rounded p-1">
				{{ task.state === 'current' ? 'en cours' : 'terminée' }}
			</text>
		</div>
	</div>
</template>

<script>
export default {
	props: ['task']
};
</script>