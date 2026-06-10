import HeroRampV2 from './HeroRampV2'
import ProofSection from './sections/ProofSection'
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

      {/* Proof — operational scale */}
      <ProofSection />

      {/* Operational Layer */}
      <OrchestrationSection />

      {/* Editorial break I */}
      <ChapterDivider
        statement="Connected is not the same as coordinated."
        sub="Three systems, each built to handle one part of the operational work end to end."
      />

      {/* Real Operational Systems */}
      <SystemsSection />

      {/* Systems In Production */}
      <ProductionSection />

      {/* Editorial break II */}
      <ChapterDivider
        statement="The outcome is not the system."
        sub="It is what the system makes possible."
      />

      {/* Why I Build Systems */}
      <WhySection />
    </div>
  )
}
