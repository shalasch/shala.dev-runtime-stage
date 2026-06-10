import HeroRampV2 from './HeroRampV2'
import OrchestrationSection from './sections/OrchestrationSection'
import SystemsSection from './sections/SystemsSection'
import ProductionSection from './sections/ProductionSection'
import WhySection from './sections/WhySection'
import ChapterDivider from './sections/ChapterDivider'

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

      {/* Chapter I → II */}
      <ChapterDivider
        statement="Connected is not the same as coordinated."
        secondary="Three systems. Each one designed to handle the operational work end to end."
      />

      {/* Section 3 — Systems */}
      <SystemsSection />

      {/* Section 4 — Production */}
      <ProductionSection />

      {/* Chapter IV → V */}
      <ChapterDivider
        statement="The outcome is not the system. It is what the system makes possible."
      />

      {/* Section 5 — Why */}
      <WhySection />
    </div>
  )
}
