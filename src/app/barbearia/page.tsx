"use client";
import React, { useState } from 'react';
import { Scissors, Clock, Users, MapPin, Plus, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
}

interface Employee {
  id: string;
  name: string;
  specialty: string;
  phone: string;
}

interface WorkingHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

function App() {
  const [barbershopName, setBarbershopName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: '', price: '', duration: '' }
  ]);
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: '', specialty: '', phone: '' }
  ]);
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    segunda: { open: '08:00', close: '18:00', closed: false },
    terca: { open: '08:00', close: '18:00', closed: false },
    quarta: { open: '08:00', close: '18:00', closed: false },
    quinta: { open: '08:00', close: '18:00', closed: false },
    sexta: { open: '08:00', close: '18:00', closed: false },
    sabado: { open: '08:00', close: '16:00', closed: false },
    domingo: { open: '08:00', close: '12:00', closed: true }
  });

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: '',
      price: '',
      duration: ''
    };
    setServices([...services, newService]);
  };

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const addEmployee = () => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: '',
      specialty: '',
      phone: ''
    };
    setEmployees([...employees, newEmployee]);
  };

  const removeEmployee = (id: string) => {
    if (employees.length > 1) {
      setEmployees(employees.filter(employee => employee.id !== id));
    }
  };

  const updateEmployee = (id: string, field: keyof Employee, value: string) => {
    setEmployees(employees.map(employee => 
      employee.id === id ? { ...employee, [field]: value } : employee
    ));
  };

  const updateWorkingHours = (day: string, field: string, value: string | boolean) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      barbershopName,
      address,
      phone,
      services,
      employees,
      workingHours
    });
    alert('Barbearia cadastrada com sucesso!');
  };

  const dayNames: { [key: string]: string } = {
    segunda: 'Segunda-feira',
    terca: 'Terça-feira',
    quarta: 'Quarta-feira',
    quinta: 'Quinta-feira',
    sexta: 'Sexta-feira',
    sabado: 'Sábado',
    domingo: 'Domingo'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scissors className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Cadastro de Barbearia</h1>
          </div>
          <p className="text-muted-foreground">Preencha todos os dados para cadastrar sua barbearia</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Informações Básicas
              </CardTitle>
              <CardDescription>
                Dados principais da sua barbearia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="barbershop-name">Nome da Barbearia *</Label>
                  <Input
                    id="barbershop-name"
                    value={barbershopName}
                    onChange={(e) => setBarbershopName(e.target.value)}
                    placeholder="Ex: Barbearia do João"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo *</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua, número, bairro, cidade - CEP"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Serviços */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-primary" />
                    Serviços Oferecidos
                  </CardTitle>
                  <CardDescription>
                    Adicione os serviços que sua barbearia oferece
                  </CardDescription>
                </div>
                <Button type="button" onClick={addService} size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Serviço
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex gap-4 items-end p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Label>Nome do Serviço</Label>
                    <Input
                      value={service.name}
                      onChange={(e) => updateService(service.id, 'name', e.target.value)}
                      placeholder="Ex: Corte de Cabelo"
                    />
                  </div>
                  <div className="w-24 space-y-2">
                    <Label>Preço (R$)</Label>
                    <Input
                      value={service.price}
                      onChange={(e) => updateService(service.id, 'price', e.target.value)}
                      placeholder="25,00"
                    />
                  </div>
                  <div className="w-24 space-y-2">
                    <Label>Duração</Label>
                    <Input
                      value={service.duration}
                      onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                      placeholder="30min"
                    />
                  </div>
                  {services.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeService(service.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Horário de Funcionamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Horário de Funcionamento
              </CardTitle>
              <CardDescription>
                Configure os horários de funcionamento para cada dia da semana
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(workingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-32">
                    <Label className="font-medium">{dayNames[day]}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${day}-open`}
                      checked={!hours.closed}
                      onCheckedChange={(checked) => updateWorkingHours(day, 'closed', !checked)}
                    />
                    <Label htmlFor={`${day}-open`} className="text-sm">Aberto</Label>
                  </div>
                  {!hours.closed && (
                    <>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">De:</Label>
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => updateWorkingHours(day, 'open', e.target.value)}
                          className="w-auto"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Até:</Label>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => updateWorkingHours(day, 'close', e.target.value)}
                          className="w-auto"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Funcionários */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Funcionários
                  </CardTitle>
                  <CardDescription>
                    Cadastre os profissionais que trabalham na barbearia
                  </CardDescription>
                </div>
                <Button type="button" onClick={addEmployee} size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Funcionário
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {employees.map((employee) => (
                <div key={employee.id} className="flex gap-4 items-end p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Label>Nome Completo</Label>
                    <Input
                      value={employee.name}
                      onChange={(e) => updateEmployee(employee.id, 'name', e.target.value)}
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Especialidade</Label>
                    <Input
                      value={employee.specialty}
                      onChange={(e) => updateEmployee(employee.id, 'specialty', e.target.value)}
                      placeholder="Ex: Barbeiro, Cabeleireiro"
                    />
                  </div>
                  <div className="w-40 space-y-2">
                    <Label>Telefone</Label>
                    <Input
                      type="tel"
                      value={employee.phone}
                      onChange={(e) => updateEmployee(employee.id, 'phone', e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  {employees.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeEmployee(employee.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Botão de Submissão */}
          <div className="flex justify-center">
            <Button type="submit" size="lg" className="px-8">
              <Save className="w-5 h-5 mr-2" />
              Cadastrar Barbearia
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;