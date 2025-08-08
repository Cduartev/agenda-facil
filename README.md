# 📅 Sistema de Agendamento

![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 📊 Visão Geral  
Este projeto é um sistema completo de agendamento, pensado para negócios como **clínicas, salões de beleza e aulas particulares**.  
Ele conta com:  
- **Backend** robusto em Java + Spring Boot  
- **Frontend** moderno com Next.js, React e TypeScript  
- **Integração com e-mail** para confirmação automática de agendamentos  

---

## 📌 Objetivo  
- Permitir que **clientes** agendem serviços online  
- Permitir que **profissionais** visualizem seus horários  
- Permitir que **administradores** gerenciem usuários, serviços e agendamentos  
- Garantir o cumprimento das **regras de negócio** como disponibilidade de horários  

---

## 🔧 Tecnologias Utilizadas  

**Backend:**  
- Java 21, Spring Boot, Spring Security, JPA, PostgreSQL  
- JWT para autenticação  
- Spring Mail + Mailtrap/Gmail SMTP  
- Swagger para documentação  
- Hospedagem: **Railway**  

**Frontend:**  
- Next.js, React, TypeScript  
- TailwindCSS ou Shadcn/UI  
- Hospedagem: **Vercel**  

---

## 🚼 Perfis de Usuário  
| Perfil         | Função no Sistema |
|----------------|------------------|
| **Cliente**    | Cadastra-se e realiza agendamentos |
| **Profissional** | Visualiza agendamentos atribuídos |
| **Administrador** | Gerencia usuários, serviços e agendamentos |

---

## 🔄 Fluxo de Uso  
1. Cliente realiza **cadastro ou login**  
2. Escolhe um **serviço** e um **profissional**  
3. Seleciona **data e horário disponível**  
4. Sistema valida o horário e cria o agendamento  
5. E-mail de **confirmação automática** é enviado  
6. Cliente pode **visualizar ou cancelar** agendamentos  

---

## 💲 Regras de Negócio  
- Não permitir agendamentos para datas passadas  
- Garantir que o profissional esteja disponível no horário escolhido  
- Impedir que o cliente agende mais de um serviço no mesmo horário  
- Exigir confirmação de agendamento via e-mail  

---

## 🔹 Backend (Java + Spring Boot)  
**Principais Endpoints REST:**  
```http
POST /auth/login
POST /clientes
GET /servicos
POST /agendamentos
GET /agendamentos?clienteId=...
DELETE /agendamentos/{id}
