import { useState } from 'react';
import { Input, Button } from '../ui';

export function PromoInput() {
  const [code, setCode] = useState('');

  return (
    <div className="flex gap-2">
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Promo code"
        className="flex-1"
        aria-label="Promo code"
      />
      <Button variant="outline" size="sm" disabled={!code.trim()} onClick={() => {}}>
        Apply
      </Button>
    </div>
  );
}
