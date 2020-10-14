function capitalizeFirstLetter(
  stringEntrada: string,
): string {
  return (
    stringEntrada.charAt(0).toUpperCase() + stringEntrada.slice(1)
  );
}

export default capitalizeFirstLetter;
