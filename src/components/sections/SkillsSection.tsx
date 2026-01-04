import { skillStack } from '@/lib/content'

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Tech Stack</span>
        </h2>

        <div className="space-y-3">
          {/* User Layer */}
          <div className="glass rounded-xl p-4 text-center border-t-4 border-purple-500">
            <h3 className="text-lg font-bold text-purple-300 mb-2">User</h3>
          </div>

          {/* Frontend Layer */}
          <div className="glass rounded-xl p-4 border-t-4 border-cyan-500">
            <h3 className="text-lg font-bold text-cyan-300 mb-3">Frontend Technologies</h3>
            <hr className="border-cyan-500/30 mb-3" />
            <div className="flex flex-wrap justify-center gap-2">
              {skillStack.frontend.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-lg transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Backend + Cloud Layer (50/50 split) */}
          <div className="grid md:grid-cols-2 gap-3">
            {/* Backend */}
            <div className="glass rounded-xl p-4 border-t-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-3">Backend Technologies</h3>
              <hr className="border-green-500/30 mb-3" />
              <div className="flex flex-wrap justify-center gap-2">
                {skillStack.backend.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm bg-green-500/10 hover:bg-green-500/20 text-green-300 rounded-lg transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud */}
            <div className="glass rounded-xl p-4 border-t-4 border-orange-500">
              <h3 className="text-lg font-bold text-orange-300 mb-3">Cloud Technologies</h3>
              <hr className="border-orange-500/30 mb-3" />
              <div className="flex flex-wrap justify-center gap-2">
                {skillStack.cloud.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 rounded-lg transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Programming Languages Layer */}
          <div className="glass rounded-xl p-4 border-t-4 border-blue-500">
            <h3 className="text-lg font-bold text-blue-300 mb-3">Programming Languages</h3>
            <hr className="border-blue-500/30 mb-3" />
            <div className="flex flex-wrap justify-center gap-2">
              {skillStack.languages.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
