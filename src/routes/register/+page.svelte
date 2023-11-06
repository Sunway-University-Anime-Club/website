<script lang="ts">
	import { registerSchema } from '$lib/forms/register';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, errors, constraints, enhance } = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?',
		validators: registerSchema
	});
</script>

<section class="register">
	<h1>Register</h1>
	<form class="register__form" method="POST" use:enhance>
		<div class="register__form__username">
			<label for="username">Username</label>
			<input
				type="text"
				name="username"
				id="username"
				bind:value={$form.username}
				{...$constraints.username}
			/>
			{#if $errors.username}
				<small>{$errors.username}</small>
			{/if}
		</div>

		<div class="register__form__password">
			<label for="password">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				bind:value={$form.password}
				{...$constraints.password}
			/>
			{#if $errors.username}
				<small>{$errors.username}</small>
			{/if}
		</div>

		<button type="submit">Register</button>
	</form>
</section>

<style>
</style>
