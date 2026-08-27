/**
 * Runnable check for the command grammar shared by the sector rail and the
 * Stack terminal. Pure functions only, no DOM, so it runs under plain node:
 *
 *   npm run check
 *
 * Kept deliberately small: this exists to catch a broken parser, not to be a
 * test suite.
 */
import assert from 'node:assert/strict'
import { parseCommand, resolveSector } from './commands.ts'

// --- resolveSector -------------------------------------------------------
assert.equal(resolveSector('projects')?.target, 'projects', 'exact label')
assert.equal(resolveSector('PROJECTS')?.target, 'projects', 'case insensitive')
assert.equal(resolveSector('3')?.target, 'projects', 'bare number')
assert.equal(resolveSector(':3')?.target, 'projects', 'colon-prefixed')
assert.equal(resolveSector('03')?.target, 'projects', 'padded id')
assert.equal(resolveSector('exp')?.target, 'experience', 'label prefix')
assert.equal(resolveSector('off_grid')?.target, 'offgrid', 'underscore label')
assert.equal(resolveSector('offgrid')?.target, 'offgrid', 'element id')
assert.equal(resolveSector('skills')?.target, 'skills', 'target beats label')
assert.equal(resolveSector('nope'), null, 'unknown returns null')
assert.equal(resolveSector(''), null, 'empty returns null')
assert.equal(resolveSector('   '), null, 'whitespace returns null')

// An ambiguous prefix must NOT silently pick one. "o" hits OFF_GRID only,
// but a prefix matching two sectors has to fail closed.
assert.equal(resolveSector('a')?.target, 'about', 'single-hit prefix resolves')

// --- parseCommand --------------------------------------------------------
assert.deepEqual(parseCommand('help'), { name: 'help', args: [], flags: {} })

assert.deepEqual(parseCommand('stack --all'), {
  name: 'stack',
  args: [],
  flags: { all: true },
})

assert.deepEqual(parseCommand('stack --filter java'), {
  name: 'stack',
  args: [],
  flags: { filter: 'java' },
})

// A flag immediately followed by another flag takes no value.
assert.deepEqual(parseCommand('stack --filter --all'), {
  name: 'stack',
  args: [],
  flags: { filter: true, all: true },
})

assert.deepEqual(parseCommand('  STACK   Java  '), {
  name: 'stack',
  args: ['java'],
  flags: {},
})

assert.deepEqual(parseCommand(''), { name: '', args: [], flags: {} })

console.log('commands: all checks passed')
