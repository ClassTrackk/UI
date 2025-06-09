import { Button } from '@mantine/core';
import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-md text-center shadow-lg border">
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <p className="text-xl mt-2 text-gray-700">Accesso negato</p>
        <p className="text-sm text-gray-500 mb-6">
          Non hai i permessi per accedere a questa pagina.
        </p>
        <Button onClick={() => navigate('/')} variant="light" color="blue">
          Torna alla Home
        </Button>
      </Card>
    </div>
  );
}
