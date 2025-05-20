import PartCard from './PartCard';

export default function PartsList({ parts, cart, onAdd }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {parts.map((part) => (
        <li key={part.id}>
          <PartCard part={part} onAdd={onAdd} inCart={cart.some((item) => item.id === part.id)} />
        </li>
      ))}
    </ul>
  );
}
