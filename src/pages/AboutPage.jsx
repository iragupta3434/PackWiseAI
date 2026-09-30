// PackWise AI — About Page
import { Link } from 'react-router-dom';
import {
  Users, Code2, Lightbulb, Target, Shield, Brain, ChevronRight, Award
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const TEAM_VALUES = [
  { icon: Shield, title: 'Scientific Integrity', text: 'We do not present demo values as validated science. Every output is clearly labelled with its evidence status.' },
  { icon: Brain, title: 'Explainability', text: 'The system explains every recommendation. Users should always know why a packaging configuration is suggested.' },
  { icon: Target, title: 'Practical Impact', text: 'Designed for real stakeholders — farmers, FPOs, MSMEs — who need practical guidance, not academic complexity.' },
  { icon: Lightbulb, title: 'Open Architecture', text: 'The system is designed to be extended with real data, validated material records and improved scientific rules over time.' },
];

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="container-wide pt-24 pb-16">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-5">
            <Award size={10} className="text-green-400" />
            <span className="text-xs text-green-400 font-medium uppercase tracking-wider">Smart India Hackathon 2026</span>
          </div>
          <Logo size="lg" />
          <p className="text-lg text-slate-300 mt-4 leading-relaxed font-medium">
            "Intelligent Packaging. Longer Shelf Life. Smarter Decisions."
          </p>
          <p className="text-slate-400 text-base mt-3 leading-relaxed max-w-2xl">
            PackWise AI is an evidence-based food packaging decision-support platform designed to help Indian food businesses — from farmers to MSMEs — select appropriate packaging based on food science, not guesswork.
          </p>
        </div>

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">The Problem We Solve</h2>
            <div className="space-y-3 text-slate-400 text-sm leading-relaxed">
              <p>
                India produces over 300 million tonnes of food annually, yet post-harvest losses remain significant — partly due to inadequate or mismatched packaging. Farmers, FPOs and small food businesses often lack access to structured packaging guidance.
              </p>
              <p>
                Packaging selection is technically complex — involving barrier properties (OTR, WVTR), material chemistry, storage physics and supply chain logistics. External consultants are expensive and not always accessible. Trial-and-error is the default.
              </p>
              <p>
                PackWise AI aims to democratise access to this knowledge through a structured, evidence-anchored decision support platform that explains its reasoning and clearly communicates the trade-offs involved.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white mb-4">Our Approach</h2>
            {[
              { num: '01', text: 'Hybrid system: scientific rules + knowledge base + multi-objective optimisation + XAI' },
              { num: '02', text: 'Three trade-off configurations — not one "answer" — because packaging is always a set of compromises' },
              { num: '03', text: 'Explainable reasoning chains so users understand and can challenge the output' },
              { num: '04', text: 'Special MAP module for fresh produce — fundamentally different logic from standard barrier packaging' },
              { num: '05', text: 'Evidence status labelling on all outputs — demo vs validated vs peer-reviewed' },
            ].map(({ num, text }) => (
              <div key={num} className="flex gap-3 p-3 bg-[#151922] border border-white/5 rounded-lg">
                <span className="text-xs font-mono text-green-400 font-bold flex-shrink-0 mt-0.5">{num}</span>
                <span className="text-xs text-slate-400 leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">Design Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM_VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-5 bg-[#151922] border border-white/5 rounded-xl hover:border-green-500/15 transition-all">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                  <Icon size={14} className="text-green-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users size={14} className="text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Team LogicalNova</h2>
          </div>
          <div className="p-6 bg-[#151922] border border-white/5 rounded-xl">
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Team LogicalNova is participating in Smart India Hackathon 2026 with PackWise AI — an intelligent food packaging decision support platform that addresses a real gap in how small food businesses access packaging science.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-3 bg-[#0f1117] rounded-lg">
                <p className="text-xs text-slate-500">Team Name</p>
                <p className="text-sm font-semibold text-white mt-0.5">LogicalNova</p>
              </div>
              <div className="p-3 bg-[#0f1117] rounded-lg">
                <p className="text-xs text-slate-500">Hackathon</p>
                <p className="text-sm font-semibold text-white mt-0.5">Smart India Hackathon 2026</p>
              </div>
              <div className="p-3 bg-[#0f1117] rounded-lg">
                <p className="text-xs text-slate-500">Project Category</p>
                <p className="text-sm font-semibold text-white mt-0.5">AgriTech / FoodTech / AI</p>
              </div>
              <div className="p-3 bg-[#0f1117] rounded-lg">
                <p className="text-xs text-slate-500">Current Phase</p>
                <p className="text-sm font-semibold text-white mt-0.5">Frontend Foundation Demo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl mb-8">
          <h3 className="text-sm font-semibold text-amber-400 mb-2">Important Disclaimer</h3>
          <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
            <p className="text-slate-300 font-medium">
              PackWise AI is a decision-support prototype. Packaging recommendations require verification through applicable standards, supplier specifications and product-package testing before commercial deployment.
            </p>
            <p>All packaging recommendations, material properties (OTR, WVTR, cost), and simulation outputs presented in this demo are placeholder data only. They are NOT laboratory-validated, scientifically certified, or commercially approved specifications.</p>
            <p>The current version is a frontend demonstration platform for SIH purposes. The backend rule engine, knowledge base, and optimisation module are planned for future development.</p>
            <p>Do not use any values from this demo platform for real packaging decisions without validation by qualified food packaging specialists.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold text-sm rounded-lg transition-all shadow-xl shadow-green-500/20"
          >
            Start Analysis Demo
            <ChevronRight size={16} />
          </Link>
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-sm rounded-lg transition-all"
          >
            View Architecture
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
