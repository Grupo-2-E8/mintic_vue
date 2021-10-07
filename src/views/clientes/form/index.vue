<template>
<section>
<form method="POST" action="/index.php" class="needs-validation" novalidate>
<div class="container">
    <div class="row mt-5">
        <div class="col-md-4 mb-3">
            <label for="validarNombre">Nombre:<span class="red">*</span></label>
            <input type="text" class="form-control" id="validarNombre" name="validarNombre" required>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="validarApellidos">Apellidos:<span class="red">*</span></label>
            <input type="text" class="form-control" id="validarApellidos" name="validarApellidos" required>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="validarEmail">Email:<span class="red">*</span></label>
            <input type="email" class="form-control" id="validarEmail" name="validarEmail" required>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="validarTelefono">Teléfono:</label>
            <input type="number" class="form-control" id="validarTelefono" name="validarTelefono" max="999999999">
        </div>
    </div>

    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="validarAsunto">Asunto:</label>
            <input type="text" class="form-control" id="validarAsunto" name="validarAsunto" required>
        </div>
    </div>

    <div class="group mb-10">
        <button class="btn btn-primary" type="submit" name="submit">Enviar</button>
        <button class="btn btn-success" type="reset" name="reset">Limpiar</button>
    </div>
  </div>
</form>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>