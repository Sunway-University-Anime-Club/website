<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Admin</h1>
<form method="POST" use:enhance>
	<button type="submit" formaction="/logout">Logout</button>
</form>
