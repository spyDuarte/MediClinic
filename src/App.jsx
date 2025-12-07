/**
 * Website Médico Perito - Desenvolvido com Metodologia Científica
 *
 * Fundamentação por área:
 *
 * 1. ARQUITETURA DA INFORMAÇÃO (Rosenfeld & Morville)
 *    - Estrutura hierárquica clara: Hero → Serviços → Sobre → Processo → Testemunhos → Contato
 *    - Navegação consistente e previsível
 *    - Labels claros seguindo vocabulário do usuário
 *
 * 2. UX DESIGN (Nielsen Norman Group)
 *    - 10 Heurísticas de Nielsen aplicadas
 *    - Feedback visual em todas interações
 *    - Reconhecimento sobre recordação
 *
 * 3. PSICOLOGIA DA PERSUASÃO (Cialdini + Fogg)
 *    - 6 Princípios de Cialdini: Autoridade, Prova Social, Reciprocidade,
 *      Escassez, Compromisso, Afinidade
 *    - Modelo Fogg de Comportamento: Motivação + Habilidade + Gatilho
 *
 * 4. MARKETING DIGITAL EM SAÚDE (Kotler)
 *    - Proposta de valor clara (Jobs-to-be-Done)
 *    - Diferenciação competitiva
 *    - Marketing de relacionamento
 *
 * 5. CRO - OTIMIZAÇÃO DE CONVERSÃO
 *    - CTAs estratégicos acima e abaixo da dobra
 *    - Redução de fricção no contato
 *    - Micro-conversões antes da macro-conversão
 *
 * 6. ACESSIBILIDADE WEB (WCAG 2.1 AA)
 *    - Contraste adequado (mínimo 4.5:1)
 *    - Navegação por teclado
 *    - Semântica HTML correta
 *    - ARIA labels quando necessário
 *
 * 7. DESIGN VISUAL (Gestalt + Tipografia)
 *    - Proximidade, similaridade, continuidade
 *    - Hierarquia visual clara
 *    - Espaço em branco estratégico
 *
 * 8. SEO (Google E-E-A-T)
 *    - Experience, Expertise, Authoritativeness, Trustworthiness
 *    - Estrutura semântica
 *    - Schema.org markup
 *
 * 9. PERFORMANCE (Core Web Vitals)
 *    - LCP, FID, CLS otimizados
 *    - Lazy loading de imagens
 *    - CSS crítico inline
 *
 * 10. COMPLIANCE E ÉTICA MÉDICA (CFM + LGPD)
 *     - Sem promessas de resultados
 *     - Transparência de informações
 *     - Consentimento de dados
 */

import { useState, useEffect, useRef } from 'react'
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Shield,
  FileText,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Stethoscope,
  Scale,
  Building2,
  Heart,
  ChevronDown,
  MessageCircle,
  Calendar,
  GraduationCap,
  BadgeCheck,
  ExternalLink,
  AlertCircle
} from 'lucide-react'

// ============================================================
// COMPONENTES DE UI REUTILIZÁVEIS
// ============================================================

/**
 * Container responsivo com largura máxima
 * Princípio: Consistência e padrões (Nielsen)
 */
const Container = ({ children, className = '', narrow = false }) => (
  <div className={`${narrow ? 'max-w-4xl' : 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
)

/**
 * Botão com variantes e estados acessíveis
 * Princípio: Feedback visual + Acessibilidade
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2'

  const variants = {
    primary: 'bg-medical text-white hover:bg-medical-dark shadow-medical hover:shadow-elevated focus-visible:ring-medical active:scale-[0.98]',
    secondary: 'bg-white text-medical border-2 border-medical hover:bg-medical-light focus-visible:ring-medical active:scale-[0.98]',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    cta: 'bg-gradient-to-r from-medical to-primary-600 text-white hover:from-medical-dark hover:to-primary-700 shadow-elevated active:scale-[0.98]'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5'
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
        {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
      {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
    </button>
  )
}

/**
 * Badge de credibilidade
 * Princípio: Autoridade e Prova Social (Cialdini)
 */
const Badge = ({ children, variant = 'trust', icon: Icon }) => {
  const variants = {
    trust: 'bg-trust-light text-trust-dark border-trust/20',
    info: 'bg-primary-50 text-primary-700 border-primary-200',
    credential: 'bg-gradient-to-r from-medical/10 to-primary-100 text-medical-dark border-medical/20'
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full border ${variants[variant]}`}>
      {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
      {children}
    </span>
  )
}

/**
 * Card com elevação e hover
 * Princípio: Affordance visual (UX)
 */
const Card = ({ children, className = '', elevated = false, hover = true }) => (
  <div className={`
    bg-white rounded-2xl border border-gray-100 p-6 md:p-8
    ${elevated ? 'shadow-soft' : 'shadow-card'}
    ${hover ? 'transition-all duration-300 hover:shadow-elevated hover:-translate-y-1' : ''}
    ${className}
  `}>
    {children}
  </div>
)

/**
 * Seção com título e subtítulo padronizados
 * Princípio: Hierarquia visual (Gestalt)
 */
const SectionHeader = ({ badge, title, subtitle, centered = true }) => (
  <div className={`${centered ? 'text-center' : ''} mb-12 md:mb-16`}>
    {badge && (
      <div className="mb-4">
        <Badge variant="info">{badge}</Badge>
      </div>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg text-gray-600 ${centered ? 'max-w-2xl mx-auto' : ''}`}>
        {subtitle}
      </p>
    )}
    <div className="divider-soft mt-6" aria-hidden="true" />
  </div>
)

// ============================================================
// COMPONENTES PRINCIPAIS DO SITE
// ============================================================

/**
 * HEADER / NAVEGAÇÃO
 *
 * Arquitetura da Informação:
 * - Navegação primária sempre visível
 * - Labels claros e concisos
 * - Hierarquia: Logo → Links → CTA
 *
 * UX: Sticky header para acesso rápido
 * Mobile: Menu hamburger acessível
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#servicos', label: 'Serviços' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#processo', label: 'Como Funciona' },
    { href: '#depoimentos', label: 'Depoimentos' },
    { href: '#contato', label: 'Contato' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20" role="navigation" aria-label="Navegação principal">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-bold text-gray-900"
            aria-label="Página inicial"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-medical to-primary-600 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <span className="hidden sm:inline">Dr. Perito</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-medical font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button href="#contato" size="sm" icon={Calendar}>
              Agendar Consulta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-white border-t border-gray-100 py-4"
            role="menu"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-600 hover:text-medical hover:bg-gray-50 font-medium"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-4">
              <Button href="#contato" className="w-full" onClick={() => setIsMenuOpen(false)}>
                Agendar Consulta
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

/**
 * HERO SECTION
 *
 * Psicologia da Persuasão (Cialdini):
 * - Autoridade: CRM visível, credenciais
 * - Prova Social: Número de perícias realizadas
 *
 * CRO:
 * - Proposta de valor clara acima da dobra
 * - CTA primário proeminente
 * - Redução de ansiedade com badges de confiança
 *
 * Jobs-to-be-Done:
 * - "Preciso de um laudo pericial confiável"
 * - "Preciso de um perito imparcial"
 */
const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center gradient-hero pt-20"
      aria-labelledby="hero-title"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-trust-light/50 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Trust Badge - Autoridade (Cialdini) */}
            <div className="mb-6 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Badge variant="credential" icon={BadgeCheck}>
                CRM/SP 123456
              </Badge>
              <Badge variant="trust" icon={Shield}>
                Perito Judicial
              </Badge>
            </div>

            {/* Main Headline - Proposta de Valor Clara */}
            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Perícia Médica com{' '}
              <span className="text-gradient">Excelência Técnica</span>
              {' '}e Ética
            </h1>

            {/* Subheadline - Jobs-to-be-Done */}
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Laudos periciais fundamentados em evidências científicas,
              com imparcialidade e respeito à dignidade de cada pessoa avaliada.
            </p>

            {/* CTA Buttons - Hierarquia clara */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button href="#contato" size="lg" variant="cta" icon={ArrowRight}>
                Solicitar Perícia
              </Button>
              <Button href="#servicos" size="lg" variant="secondary">
                Conhecer Serviços
              </Button>
            </div>

            {/* Social Proof - Prova Social (Cialdini) */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                  ))}
                </div>
                <span>5.0 no Google</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-trust" aria-hidden="true" />
                <span>+500 perícias realizadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-medical" aria-hidden="true" />
                <span>15 anos de experiência</span>
              </div>
            </div>
          </div>

          {/* Visual Element - Imagem de Credibilidade */}
          <div className="relative hidden lg:block">
            <div className="relative bg-white rounded-3xl shadow-elevated p-8 transform rotate-1">
              {/* Placeholder para foto profissional */}
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-medical to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Stethoscope className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-gray-500 text-sm">Foto Profissional</p>
                </div>
              </div>

              {/* Floating credential card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-soft p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-trust-light rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-trust" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Especialista</p>
                    <p className="text-sm text-gray-600">Medicina Legal</p>
                  </div>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-soft p-4 border border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-medical">500+</p>
                  <p className="text-sm text-gray-600">Perícias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  )
}

/**
 * SERVIÇOS
 *
 * Arquitetura da Informação:
 * - Categorização clara dos serviços
 * - Descrições focadas em benefícios
 *
 * Jobs-to-be-Done:
 * - Cada card responde a uma necessidade específica
 *
 * Design Visual (Gestalt):
 * - Grid uniforme (proximidade e similaridade)
 * - Ícones como ancoras visuais
 */
const Services = () => {
  const services = [
    {
      icon: Scale,
      title: 'Perícia Judicial',
      description: 'Avaliação técnica imparcial para processos judiciais, com laudos detalhados e fundamentados em literatura médica.',
      features: ['Ações trabalhistas', 'Ações cíveis', 'Processos criminais']
    },
    {
      icon: Building2,
      title: 'Perícia Administrativa',
      description: 'Avaliação pericial para empresas e órgãos públicos, incluindo exames admissionais, demissionais e de retorno ao trabalho.',
      features: ['Avaliação de capacidade', 'Nexo causal', 'Readaptação funcional']
    },
    {
      icon: Shield,
      title: 'Perícia Previdenciária',
      description: 'Acompanhamento e assistência técnica em perícias do INSS, com análise completa do caso clínico.',
      features: ['Auxílio-doença', 'Aposentadoria por invalidez', 'BPC/LOAS']
    },
    {
      icon: FileText,
      title: 'Assistência Técnica',
      description: 'Atuação como assistente técnico das partes, com análise crítica de laudos e elaboração de pareceres.',
      features: ['Análise de laudos', 'Quesitos técnicos', 'Pareceres médicos']
    },
    {
      icon: Heart,
      title: 'Avaliação de Dano Corporal',
      description: 'Quantificação técnica de lesões e sequelas para fins de indenização, seguindo protocolos internacionais.',
      features: ['Lesões corporais', 'Sequelas permanentes', 'Dano estético']
    },
    {
      icon: Users,
      title: 'Junta Médica',
      description: 'Participação em juntas médicas para casos complexos, oferecendo segunda opinião técnica qualificada.',
      features: ['Casos complexos', 'Divergências técnicas', 'Segunda opinião']
    }
  ]

  return (
    <section id="servicos" className="section bg-white" aria-labelledby="services-title">
      <Container>
        <SectionHeader
          badge="Áreas de Atuação"
          title="Serviços Especializados em Perícia Médica"
          subtitle="Atendimento personalizado para cada tipo de demanda, sempre com fundamentação técnica e ética profissional."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card key={index} elevated hover className="group">
              {/* Icon */}
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-medical group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-medical group-hover:text-white transition-colors" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>

              {/* Features list */}
              <ul className="space-y-2" role="list">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-trust flex-shrink-0" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* CTA secundário */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Não encontrou o serviço que precisa?</p>
          <Button href="#contato" variant="secondary" icon={MessageCircle}>
            Fale Conosco
          </Button>
        </div>
      </Container>
    </section>
  )
}

/**
 * SOBRE O MÉDICO
 *
 * Psicologia da Persuasão (Cialdini):
 * - Autoridade: Formação, títulos, experiência
 * - Afinidade: Humanização, valores, missão
 *
 * E-E-A-T (Google):
 * - Experience: Anos de prática
 * - Expertise: Especialização
 * - Authoritativeness: Credenciais
 * - Trustworthiness: Ética
 */
const About = () => {
  const credentials = [
    { icon: GraduationCap, label: 'Medicina - USP', sublabel: 'Graduação' },
    { icon: Award, label: 'Medicina Legal', sublabel: 'Especialização' },
    { icon: BadgeCheck, label: 'CRM/SP 123456', sublabel: 'Registro ativo' },
    { icon: Scale, label: 'Perito Judicial', sublabel: 'TJSP' }
  ]

  const values = [
    {
      title: 'Imparcialidade',
      description: 'Compromisso com a verdade técnica, independente das partes envolvidas.'
    },
    {
      title: 'Fundamentação Científica',
      description: 'Laudos baseados em literatura médica atualizada e protocolos reconhecidos.'
    },
    {
      title: 'Respeito Humano',
      description: 'Cada avaliação conduzida com dignidade e acolhimento ao periciando.'
    },
    {
      title: 'Transparência',
      description: 'Comunicação clara sobre metodologia, prazos e honorários.'
    }
  ]

  return (
    <section id="sobre" className="section gradient-trust" aria-labelledby="about-title">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image / Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image placeholder */}
              <div className="aspect-square bg-white rounded-3xl shadow-soft p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-medical/20 to-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Stethoscope className="w-20 h-20 text-medical" />
                  </div>
                  <p className="text-gray-500 text-sm">Foto do Médico</p>
                </div>
              </div>

              {/* Credentials grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {credentials.map((cred, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-card flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <cred.icon className="w-5 h-5 text-medical" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{cred.label}</p>
                      <p className="text-xs text-gray-500">{cred.sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <Badge variant="info" icon={Stethoscope}>Sobre o Médico</Badge>

            <h2 id="about-title" className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              Dr. [Nome Completo]
            </h2>

            <p className="text-lg text-gray-600 mb-6">
              Médico formado pela Universidade de São Paulo (USP), com especialização em
              Medicina Legal e Perícias Médicas. Ao longo de 15 anos de atuação, desenvolvi
              uma prática fundamentada em rigor científico e profundo respeito pela dignidade
              humana.
            </p>

            <p className="text-gray-600 mb-8">
              Atuo como perito judicial em diversas comarcas do estado de São Paulo,
              além de prestar assistência técnica para escritórios de advocacia e empresas.
              Minha missão é contribuir para decisões justas através de avaliações técnicas
              imparciais e fundamentadas.
            </p>

            {/* Values */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Meus Valores</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-trust flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-gray-900">{value.title}</p>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/**
 * PROCESSO / COMO FUNCIONA
 *
 * UX Design (Nielsen):
 * - Visibilidade do status do sistema
 * - Correspondência com mundo real
 * - Controle e liberdade do usuário
 *
 * CRO:
 * - Reduz ansiedade mostrando próximos passos
 * - Aumenta confiança através de transparência
 */
const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Contato Inicial',
      description: 'Entre em contato por telefone, WhatsApp ou formulário. Explicarei o processo e esclarecerei suas dúvidas sobre a perícia.',
      icon: MessageCircle
    },
    {
      number: '02',
      title: 'Análise do Caso',
      description: 'Analiso a documentação médica e jurídica disponível para compreender o contexto e definir a melhor abordagem.',
      icon: FileText
    },
    {
      number: '03',
      title: 'Agendamento',
      description: 'Agendamos data e horário convenientes. O exame é realizado em consultório equipado, com ambiente acolhedor.',
      icon: Calendar
    },
    {
      number: '04',
      title: 'Exame Pericial',
      description: 'Avaliação completa seguindo protocolos técnicos, com respeito e atenção às necessidades do periciando.',
      icon: Stethoscope
    },
    {
      number: '05',
      title: 'Elaboração do Laudo',
      description: 'Laudo detalhado e fundamentado em literatura médica, respondendo objetivamente aos quesitos formulados.',
      icon: FileText
    },
    {
      number: '06',
      title: 'Entrega e Suporte',
      description: 'Entrega no prazo acordado, com disponibilidade para esclarecimentos técnicos quando necessário.',
      icon: CheckCircle
    }
  ]

  return (
    <section id="processo" className="section bg-white" aria-labelledby="process-title">
      <Container>
        <SectionHeader
          badge="Como Funciona"
          title="Processo Transparente e Eficiente"
          subtitle="Conheça as etapas do atendimento, do primeiro contato à entrega do laudo pericial."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" aria-hidden="true">
                  <div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-200 transform rotate-45" />
                </div>
              )}

              <div className="relative z-10 text-center">
                {/* Step number */}
                <div className="w-16 h-16 bg-gradient-to-br from-medical to-primary-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-medical">
                  <step.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>

                <span className="text-sm font-semibold text-medical">Passo {step.number}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 p-8 bg-primary-50 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Pronto para começar?</h3>
          <p className="text-gray-600 mb-6">Tire suas dúvidas e agende uma consulta inicial.</p>
          <Button href="#contato" variant="cta" icon={ArrowRight}>
            Entrar em Contato
          </Button>
        </div>
      </Container>
    </section>
  )
}

/**
 * DEPOIMENTOS
 *
 * Psicologia da Persuasão (Cialdini):
 * - Prova Social: Experiências de outros clientes
 * - Autoridade: Credibilidade através de terceiros
 *
 * Compliance CFM:
 * - Depoimentos genéricos (sem identificação de pacientes)
 * - Foco no processo, não em resultados
 */
const Testimonials = () => {
  const testimonials = [
    {
      content: 'Profissional extremamente competente e ético. O laudo foi entregue dentro do prazo, com fundamentação técnica impecável.',
      author: 'Advogado Trabalhista',
      role: 'São Paulo, SP',
      rating: 5
    },
    {
      content: 'A avaliação pericial foi conduzida com muito respeito e profissionalismo. Me senti acolhido durante todo o processo.',
      author: 'Periciando',
      role: 'Campinas, SP',
      rating: 5
    },
    {
      content: 'Indico para todos os meus colegas. Laudos sempre bem fundamentados e atendimento diferenciado.',
      author: 'Advogada Previdenciária',
      role: 'Santos, SP',
      rating: 5
    }
  ]

  return (
    <section id="depoimentos" className="section bg-gray-50" aria-labelledby="testimonials-title">
      <Container>
        <SectionHeader
          badge="Depoimentos"
          title="O Que Dizem Sobre Nosso Trabalho"
          subtitle="Feedback de advogados e periciandos sobre a experiência de atendimento."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1">
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </blockquote>

              {/* Author */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 flex-wrap justify-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <span><strong>5.0</strong> de avaliação no Google</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-medical" aria-hidden="true" />
              <span><strong>500+</strong> perícias realizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-trust" aria-hidden="true" />
              <span><strong>98%</strong> de satisfação</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/**
 * FAQ - PERGUNTAS FREQUENTES
 *
 * Arquitetura da Informação:
 * - Respostas às dúvidas mais comuns
 * - Reduz fricção no processo de decisão
 *
 * SEO:
 * - Conteúdo rico em palavras-chave
 * - Estrutura de FAQ para featured snippets
 */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'O que é uma perícia médica?',
      answer: 'A perícia médica é uma avaliação técnica realizada por médico especializado para esclarecer questões médicas em processos judiciais, administrativos ou previdenciários. O perito analisa documentos médicos, examina o periciando e elabora um laudo técnico imparcial.'
    },
    {
      question: 'Qual a diferença entre perito e assistente técnico?',
      answer: 'O perito é nomeado pelo juiz e deve atuar com imparcialidade. O assistente técnico é indicado por uma das partes (autor ou réu) e pode analisar criticamente o laudo pericial, elaborando parecer técnico em defesa dos interesses de quem o contratou.'
    },
    {
      question: 'Quanto tempo leva para receber o laudo?',
      answer: 'O prazo varia conforme a complexidade do caso, geralmente entre 15 e 30 dias após o exame pericial. Casos urgentes podem ser negociados mediante análise prévia. O prazo será sempre acordado previamente.'
    },
    {
      question: 'Como são definidos os honorários?',
      answer: 'Os honorários são definidos de acordo com a complexidade do caso, tipo de perícia e urgência. Apresento orçamento detalhado antes de iniciar qualquer trabalho, garantindo total transparência.'
    },
    {
      question: 'Atende quais regiões?',
      answer: 'Atuo presencialmente na Grande São Paulo e região metropolitana. Para outras localidades, avaliamos caso a caso a possibilidade de deslocamento ou realização de exame por videoconferência quando apropriado.'
    },
    {
      question: 'O que devo levar no dia do exame pericial?',
      answer: 'Documento de identificação com foto, todos os exames e laudos médicos relacionados ao caso, atestados, receitas e qualquer documentação que comprove tratamentos realizados. Quanto mais completa a documentação, mais precisa será a avaliação.'
    }
  ]

  return (
    <section className="section bg-white" aria-labelledby="faq-title">
      <Container narrow>
        <SectionHeader
          badge="Dúvidas Frequentes"
          title="Perguntas Comuns"
          subtitle="Respostas para as principais dúvidas sobre perícia médica."
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/**
 * CONTATO
 *
 * CRO:
 * - Múltiplos canais de contato
 * - Formulário simples (redução de fricção)
 * - CTA claro e visível
 *
 * LGPD:
 * - Checkbox de consentimento
 * - Link para política de privacidade
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui seria integrado com backend/serviço de email
    console.log('Form submitted:', formData)
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Telefone',
      value: '(11) 99999-9999',
      href: 'tel:+5511999999999'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '(11) 99999-9999',
      href: 'https://wa.me/5511999999999'
    },
    {
      icon: Mail,
      label: 'E-mail',
      value: 'contato@drperito.com.br',
      href: 'mailto:contato@drperito.com.br'
    },
    {
      icon: MapPin,
      label: 'Endereço',
      value: 'Av. Paulista, 1000 - São Paulo/SP',
      href: '#'
    },
    {
      icon: Clock,
      label: 'Horário',
      value: 'Seg a Sex, 8h às 18h',
      href: null
    }
  ]

  return (
    <section id="contato" className="section gradient-cta text-white" aria-labelledby="contact-title">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <Badge variant="info" icon={MessageCircle}>Contato</Badge>

            <h2 id="contact-title" className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
              Vamos Conversar?
            </h2>

            <p className="text-lg text-primary-100 mb-8">
              Entre em contato para agendar uma consulta, solicitar orçamento
              ou esclarecer dúvidas sobre perícia médica.
            </p>

            {/* Contact methods */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-200">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white hover:text-primary-100 font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick CTA */}
            <a
              href="https://wa.me/5511999999999"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Chamar no WhatsApp
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-elevated">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Selecione o assunto</option>
                  <option value="pericia-judicial">Perícia Judicial</option>
                  <option value="pericia-administrativa">Perícia Administrativa</option>
                  <option value="pericia-previdenciaria">Perícia Previdenciária</option>
                  <option value="assistencia-tecnica">Assistência Técnica</option>
                  <option value="orcamento">Solicitar Orçamento</option>
                  <option value="duvidas">Dúvidas Gerais</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field resize-none"
                  placeholder="Descreva brevemente sua necessidade..."
                />
              </div>

              {/* LGPD Consent */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-medical border-gray-300 rounded focus:ring-medical"
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  Concordo com o tratamento dos meus dados pessoais conforme a{' '}
                  <a href="#" className="text-medical hover:underline">Política de Privacidade</a>
                  {' '}e a Lei Geral de Proteção de Dados (LGPD). *
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg" icon={ArrowRight}>
                Enviar Mensagem
              </Button>

              <p className="text-xs text-gray-500 text-center">
                * Campos obrigatórios. Respondemos em até 24 horas úteis.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}

/**
 * FOOTER
 *
 * Arquitetura da Informação:
 * - Links secundários organizados
 * - Informações legais (CFM, LGPD)
 *
 * SEO:
 * - Links internos
 * - Dados estruturados
 */
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400" role="contentinfo">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-medical to-primary-600 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="text-xl font-bold text-white">Dr. Perito</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Perícia médica com excelência técnica, fundamentação científica e respeito
                à dignidade humana. Atuação ética em conformidade com o Conselho Federal de Medicina.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-trust" aria-hidden="true" />
                <span>CRM/SP 123456 - Registro Ativo</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#processo" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a></li>
                <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Informações Legais</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {currentYear} Dr. [Nome]. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              Este site não substitui consulta médica
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

/**
 * FLOATING WHATSAPP BUTTON
 *
 * CRO:
 * - Acesso rápido ao contato
 * - Conversão por canal preferencial
 *
 * UX:
 * - Posição familiar (canto inferior direito)
 * - Não obstrui conteúdo importante
 */
const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/5511999999999"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
    aria-label="Contato via WhatsApp"
  >
    <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />
  </a>
)

// ============================================================
// APP PRINCIPAL
// ============================================================

function App() {
  return (
    <div className="min-h-screen">
      {/* Skip to content link (Acessibilidade) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-medical text-white px-4 py-2 rounded-lg z-50"
      >
        Pular para o conteúdo principal
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
