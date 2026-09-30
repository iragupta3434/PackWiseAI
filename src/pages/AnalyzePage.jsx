// PackWise AI — Analysis Page (Multi-Step Wizard)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, Package, Thermometer, Briefcase,
  Leaf, ClipboardCheck, AlertTriangle, Info, CheckCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Stepper from '../components/Stepper';
import Button from '../components/Button';
import Card from '../components/Card';
import { Input, Select, Slider, RadioGroup } from '../components/FormFields';
import LoadingScreen from '../components/LoadingScreen';
import { useAnalysis } from '../context/AnalysisContext';
import { useToast } from '../context/ToastContext';
import { analyzePackaging } from '../services/api';
import { COMMODITIES, PACKAGING_FORMATS, STORAGE_TYPES } from '../data/mockData';

// ---- Step Definitions ----
const getSteps = (isFreshProduce) => {
  const base = [
    { id: 1, label: 'Food Profile', icon: Package },
    { id: 2, label: 'Storage', icon: Thermometer },
    { id: 3, label: 'Business', icon: Briefcase },
    { id: 4, label: 'Review', icon: ClipboardCheck },
  ];
  if (isFreshProduce) {
    base.splice(3, 0, { id: 4, label: 'MAP / Produce', icon: Leaf });
    base[4] = { id: 5, label: 'Review', icon: ClipboardCheck };
  }
  return base;
};

// ---- STEP 1: Food Profile ----
function Step1FoodProfile({ formData, updateField }) {
  return (
    <div className="space-y-5">
      <StepHeader
        icon={Package}
        title="Food Profile"
        description="Describe the physical and chemical properties of your food product. These determine the primary packaging requirements."
      />

      <Select
        id="commodity"
        label="Commodity / Product Type *"
        value={formData.commodity}
        onChange={(e) => updateField('commodity', e.target.value)}
        options={COMMODITIES}
        hint="If fresh produce is selected, an additional MAP/Atmosphere step will appear."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id="moistureContent"
          label="Moisture Content (%)"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={formData.moistureContent}
          onChange={(e) => updateField('moistureContent', e.target.value)}
          placeholder="e.g. 12"
          suffix="%"
          hint="Wet basis, typical of the product"
        />
        <Input
          id="fatContent"
          label="Fat / Oil Content (%)"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={formData.fatContent}
          onChange={(e) => updateField('fatContent', e.target.value)}
          placeholder="e.g. 28"
          suffix="%"
          hint="High fat indicates oxidation risk"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id="pH"
          label="pH"
          type="number"
          min="0"
          max="14"
          step="0.1"
          value={formData.pH}
          onChange={(e) => updateField('pH', e.target.value)}
          placeholder="e.g. 6.2"
          hint="Typical pH of the product (0–14)"
        />
        <Input
          id="waterActivity"
          label="Water Activity (aw)"
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={formData.waterActivity}
          onChange={(e) => updateField('waterActivity', e.target.value)}
          placeholder="e.g. 0.55"
          hint="0 = bone dry, 1 = pure water"
        />
      </div>

      <RadioGroup
        label="Oxidation Sensitivity"
        value={formData.oxidationSensitivity}
        onChange={(v) => updateField('oxidationSensitivity', v)}
        options={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'very-high', label: 'Very High' },
        ]}
      />

      <FieldNote>
        Fields marked * are required. Others improve recommendation accuracy but can be left blank.
      </FieldNote>
    </div>
  );
}

// ---- STEP 2: Storage Conditions ----
function Step2Storage({ formData, updateField }) {
  return (
    <div className="space-y-5">
      <StepHeader
        icon={Thermometer}
        title="Storage Conditions"
        description="Storage environment and supply chain parameters significantly affect barrier requirements. Provide accurate values where available."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id="storageTemperature"
          label="Storage Temperature (°C)"
          type="number"
          min="-30"
          max="50"
          value={formData.storageTemperature}
          onChange={(e) => updateField('storageTemperature', e.target.value)}
          placeholder="e.g. 25"
          suffix="°C"
          hint="Design temperature for packaging"
        />
        <Input
          id="relativeHumidity"
          label="Relative Humidity (%)"
          type="number"
          min="0"
          max="100"
          value={formData.relativeHumidity}
          onChange={(e) => updateField('relativeHumidity', e.target.value)}
          placeholder="e.g. 65"
          suffix="% RH"
          hint="Ambient RH at storage location"
        />
      </div>

      <Select
        id="storageType"
        label="Storage Type"
        value={formData.storageType}
        onChange={(e) => updateField('storageType', e.target.value)}
        options={STORAGE_TYPES}
      />

      <Input
        id="targetShelfLife"
        label="Target Shelf Life"
        value={formData.targetShelfLife}
        onChange={(e) => updateField('targetShelfLife', e.target.value)}
        placeholder="e.g. 6 months, 90 days, 1 year"
        hint="Enter as descriptive text (e.g. '6 months')"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id="transportationDistance"
          label="Transportation Distance (km)"
          type="number"
          min="0"
          value={formData.transportationDistance}
          onChange={(e) => updateField('transportationDistance', e.target.value)}
          placeholder="e.g. 500"
          suffix="km"
        />
        <Input
          id="transportationDuration"
          label="Transportation Duration"
          value={formData.transportationDuration}
          onChange={(e) => updateField('transportationDuration', e.target.value)}
          placeholder="e.g. 3 days"
          hint="Time in transit"
        />
      </div>

      <FieldNote>
        Temperature is the most critical input — OTR and WVTR values must be specified at a design temperature. If unsure, use worst-case (maximum expected storage temperature).
      </FieldNote>
    </div>
  );
}

// ---- STEP 3: Business Requirements ----
function Step3Business({ formData, updateField }) {
  const handlePriorityChange = (field, value) => {
    // Keep priorities summing to 100 (approximately)
    updateField(field, value);
  };

  return (
    <div className="space-y-5">
      <StepHeader
        icon={Briefcase}
        title="Business Requirements"
        description="Your cost, sustainability and format preferences determine which trade-off configuration is most relevant to your context."
      />

      <RadioGroup
        label="Budget Range"
        value={formData.budget}
        onChange={(v) => updateField('budget', v)}
        options={[
          { value: 'low', label: 'Cost-Sensitive' },
          { value: 'medium', label: 'Moderate Budget' },
          { value: 'high', label: 'Performance-First' },
        ]}
      />

      <RadioGroup
        label="Sustainability Preference"
        value={formData.sustainabilityPreference}
        onChange={(v) => updateField('sustainabilityPreference', v)}
        options={[
          { value: 'performance', label: 'Performance First' },
          { value: 'balanced', label: 'Balanced' },
          { value: 'sustainability', label: 'Sustainability Priority' },
        ]}
      />

      <Select
        id="packagingFormat"
        label="Preferred Packaging Format"
        value={formData.packagingFormat}
        onChange={(e) => updateField('packagingFormat', e.target.value)}
        options={PACKAGING_FORMATS}
        hint="Leave blank if format is not yet decided"
      />

      {/* Priority sliders */}
      <div className="space-y-3 p-4 bg-[#0f1117] rounded-xl border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <Info size={12} className="text-blue-400" />
          <span className="text-xs text-slate-400 font-medium">Optimisation Priorities</span>
          <span className="text-xs text-slate-600 ml-auto">(Indicative — used for scoring)</span>
        </div>
        <Slider
          id="priorityPerformance"
          label="Barrier Performance"
          value={formData.priorityPerformance}
          onChange={(v) => updateField('priorityPerformance', v)}
          hint="Weight given to OTR/WVTR performance in scoring"
        />
        <Slider
          id="priorityCost"
          label="Cost"
          value={formData.priorityCost}
          onChange={(v) => updateField('priorityCost', v)}
          hint="Weight given to material cost in scoring"
        />
        <Slider
          id="prioritySustainability"
          label="Sustainability"
          value={formData.prioritySustainability}
          onChange={(v) => updateField('prioritySustainability', v)}
          hint="Weight given to recyclability and environmental profile"
        />
        <p className="text-xs text-slate-600">
          Sliders are independent and indicative. They influence the scoring display, not a hard optimisation.
        </p>
      </div>
    </div>
  );
}

// ---- STEP 4: Fresh Produce / MAP (Conditional) ----
function Step4MAP({ formData, updateField }) {
  return (
    <div className="space-y-5">
      <StepHeader
        icon={Leaf}
        title="Fresh Produce / MAP Module"
        description="For fresh produce, packaging must match the respiration rate of the produce. This step collects MAP-specific parameters."
      />

      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
        <div className="flex items-start gap-2">
          <AlertTriangle size={12} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-emerald-400">MAP Design Principle</p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              For fresh produce, the goal is to match film OTR to produce respiration rate — not to minimise OTR. Too low an OTR creates anaerobic conditions; too high allows continued aerobic deterioration.
            </p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id="produceType"
          label="Produce Type"
          value={formData.produceType}
          onChange={(e) => updateField('produceType', e.target.value)}
          placeholder="e.g. Baby spinach, Tomato, Broccoli"
          hint="Specific variety improves estimate"
        />
        <Input
          id="respirationRate"
          label="Respiration Rate (ml O₂/kg/h)"
          type="number"
          min="0"
          value={formData.respirationRate}
          onChange={(e) => updateField('respirationRate', e.target.value)}
          placeholder="e.g. 45"
          hint="At design storage temperature"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id="packWeight"
          label="Pack Weight (g)"
          type="number"
          min="0"
          value={formData.packWeight}
          onChange={(e) => updateField('packWeight', e.target.value)}
          placeholder="e.g. 150"
          suffix="g"
        />
        <Input
          id="filmArea"
          label="Film / Lidding Area (m²)"
          type="number"
          min="0"
          step="0.001"
          value={formData.filmArea}
          onChange={(e) => updateField('filmArea', e.target.value)}
          placeholder="e.g. 0.04"
          suffix="m²"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id="targetO2"
          label="Target O₂ (%)"
          type="number"
          min="0"
          max="21"
          step="0.5"
          value={formData.targetO2}
          onChange={(e) => updateField('targetO2', e.target.value)}
          placeholder="e.g. 5"
          suffix="%"
          hint="Typical range 3–10% for most produce"
        />
        <Input
          id="targetCO2"
          label="Target CO₂ (%)"
          type="number"
          min="0"
          max="20"
          step="0.5"
          value={formData.targetCO2}
          onChange={(e) => updateField('targetCO2', e.target.value)}
          placeholder="e.g. 10"
          suffix="%"
          hint="Typical range 5–15% depending on produce"
        />
      </div>

      <FieldNote>
        Respiration rate data can be obtained from published literature for specific commodities. PackWise AI will generate a model estimate — not a certified specification.
      </FieldNote>
    </div>
  );
}

// ---- STEP REVIEW: Summary ----
function StepReview({ formData, isFreshProduce }) {
  const sections = [
    {
      title: 'Food Profile',
      icon: Package,
      fields: [
        { label: 'Commodity', value: COMMODITIES.find(c => c.value === formData.commodity)?.label || formData.commodity || '—' },
        { label: 'Moisture Content', value: formData.moistureContent ? `${formData.moistureContent}%` : '—' },
        { label: 'Fat Content', value: formData.fatContent ? `${formData.fatContent}%` : '—' },
        { label: 'pH', value: formData.pH || '—' },
        { label: 'Water Activity', value: formData.waterActivity || '—' },
        { label: 'Oxidation Sensitivity', value: formData.oxidationSensitivity || '—' },
      ],
    },
    {
      title: 'Storage Conditions',
      icon: Thermometer,
      fields: [
        { label: 'Temperature', value: formData.storageTemperature ? `${formData.storageTemperature}°C` : '—' },
        { label: 'Humidity', value: formData.relativeHumidity ? `${formData.relativeHumidity}% RH` : '—' },
        { label: 'Storage Type', value: STORAGE_TYPES.find(s => s.value === formData.storageType)?.label || formData.storageType || '—' },
        { label: 'Target Shelf Life', value: formData.targetShelfLife || '—' },
        { label: 'Transport Distance', value: formData.transportationDistance ? `${formData.transportationDistance} km` : '—' },
      ],
    },
    {
      title: 'Business Requirements',
      icon: Briefcase,
      fields: [
        { label: 'Budget', value: formData.budget || '—' },
        { label: 'Sustainability', value: formData.sustainabilityPreference || '—' },
        { label: 'Format', value: PACKAGING_FORMATS.find(f => f.value === formData.packagingFormat)?.label || formData.packagingFormat || '—' },
        { label: 'Priority: Performance', value: `${formData.priorityPerformance}%` },
        { label: 'Priority: Cost', value: `${formData.priorityCost}%` },
        { label: 'Priority: Sustainability', value: `${formData.prioritySustainability}%` },
      ],
    },
  ];

  if (isFreshProduce) {
    sections.push({
      title: 'MAP / Fresh Produce',
      icon: Leaf,
      fields: [
        { label: 'Produce Type', value: formData.produceType || '—' },
        { label: 'Respiration Rate', value: formData.respirationRate ? `${formData.respirationRate} ml O₂/kg/h` : '—' },
        { label: 'Pack Weight', value: formData.packWeight ? `${formData.packWeight} g` : '—' },
        { label: 'Film Area', value: formData.filmArea ? `${formData.filmArea} m²` : '—' },
        { label: 'Target O₂', value: formData.targetO2 ? `${formData.targetO2}%` : '—' },
        { label: 'Target CO₂', value: formData.targetCO2 ? `${formData.targetCO2}%` : '—' },
      ],
    });
  }

  return (
    <div className="space-y-5">
      <StepHeader
        icon={ClipboardCheck}
        title="Review & Analyse"
        description="Review your inputs before generating packaging recommendations. The analysis will use demo data until the backend is connected."
      />

      <div className="space-y-3">
        {sections.map(({ title, icon: Icon, fields }) => (
          <div key={title} className="bg-[#0f1117] border border-white/5 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <Icon size={12} className="text-green-400" />
              <span className="text-xs font-semibold text-slate-300">{title}</span>
            </div>
            <div className="p-4 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {fields.map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-xs text-slate-600">{label}</span>
                  <span className="text-xs font-medium text-slate-300 mt-0.5">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
        <div className="flex items-start gap-2">
          <AlertTriangle size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-400">
            <strong>Demo Analysis:</strong> This will return a structured demo output with placeholder values. Real analysis requires backend integration. All demo outputs are clearly labelled.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---- Helper Components ----
function StepHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-white/5">
      <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-green-400" />
      </div>
      <div>
        <h2 className="text-base font-bold text-white">{title}</h2>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function FieldNote({ children }) {
  return (
    <div className="flex items-start gap-2 p-3 bg-blue-500/5 border border-blue-500/15 rounded-lg">
      <Info size={11} className="text-blue-400 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-slate-500 leading-relaxed">{children}</p>
    </div>
  );
}

// ---- Main Analysis Page ----
export default function AnalyzePage() {
  const { formData, updateField, isFreshProduce, currentStep, setCurrentStep, setResults, setIsAnalyzing } = useAnalysis();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const steps = getSteps(isFreshProduce);
  const totalSteps = steps.length;
  const reviewStepNumber = totalSteps; // last step is always review

  const canGoNext = () => {
    if (currentStep === 1 && !formData.commodity) return false;
    return true;
  };

  const handleNext = () => {
    if (!canGoNext()) {
      addToast('Please select a commodity to continue.', 'warning');
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setIsAnalyzing(true);
    try {
      const results = await analyzePackaging(formData);
      setResults(results);
      addToast('Demo analysis complete. Navigating to results.', 'success');
      navigate('/results');
    } catch (err) {
      addToast('Analysis failed. Please try again.', 'error');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
      setIsAnalyzing(false);
    }
  };

  const renderStep = () => {
    // Determine actual step content based on current step and whether fresh produce
    if (currentStep === 1) return <Step1FoodProfile formData={formData} updateField={updateField} />;
    if (currentStep === 2) return <Step2Storage formData={formData} updateField={updateField} />;
    if (currentStep === 3) return <Step3Business formData={formData} updateField={updateField} />;
    if (currentStep === 4 && isFreshProduce) return <Step4MAP formData={formData} updateField={updateField} />;
    // Review is always last
    return <StepReview formData={formData} isFreshProduce={isFreshProduce} />;
  };

  const isLastStep = currentStep === totalSteps;

  return (
    <div className="page-wrapper">
      {loading && (
        <LoadingScreen
          message="Generating packaging recommendations…"
          submessage="Running demo analysis — backend integration pending"
        />
      )}

      <Navbar />

      <div className="container-wide pt-24 pb-16">
        {/* Page header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs text-green-400 font-medium uppercase tracking-wider">Packaging Analysis Wizard</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Food Packaging Analysis</h1>
          <p className="text-slate-400 text-sm mt-1">
            Complete all steps to generate three evidence-anchored packaging configurations.
          </p>

          {/* Demo notice */}
          <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-amber-500/5 border border-amber-500/15 rounded-lg w-fit">
            <AlertTriangle size={11} className="text-amber-400" />
            <span className="text-xs text-amber-400">Demo mode — outputs are placeholder data only</span>
          </div>
        </div>

        {/* Stepper */}
        <div className="max-w-3xl mx-auto mb-8 overflow-x-auto scrollbar-hide">
          <div className="min-w-[400px]">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
        </div>

        {/* Form card */}
        <div className="max-w-3xl mx-auto">
          <Card padding="lg">
            {renderStep()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/5">
              <Button
                variant="ghost"
                icon={ChevronLeft}
                disabled={currentStep === 1}
                onClick={handleBack}
              >
                Back
              </Button>

              <div className="flex items-center gap-2">
                {!isLastStep ? (
                  <Button
                    variant="primary"
                    iconRight={ChevronRight}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    icon={CheckCircle}
                    onClick={handleAnalyze}
                    isLoading={loading}
                  >
                    Generate Packaging Recommendations
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Tips */}
          <div className="mt-4 p-4 bg-[#151922] border border-white/5 rounded-xl">
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-400">Tip:</strong> More complete data produces better-matched recommendations. However, you can proceed with minimal inputs — PackWise AI will use defaults and clearly flag assumptions in the output.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
