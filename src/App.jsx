import HeroRampV2 from './HeroRampV2'
import OrchestrationSection from './sections/OrchestrationSection'
import SystemsSection from './sections/SystemsSection'
import ProductionSection from './sections/ProductionSection'
import WhySection from './sections/WhySection'

export default function App() {
  return (
    <div style={{ background: '#F5F4F1' }}>
      {/* Hero */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}>
        <HeroRampV2 />
      </div>

      {/* Section 2 — Orchestration */}
      <OrchestrationSection />

      {/* Section 3 — Systems */}
      <SystemsSection />

      {/* Section 4 — Production */}
      <ProductionSection />

      {/* Section 5 — Why */}
      <WhySection />
    </div>
  )
}
