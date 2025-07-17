export default function getRandomColor(): string {
  const red = Math.round(Math.random() * 255);
  const green = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}
