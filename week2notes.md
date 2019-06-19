### One-time Pad limitations
- Key is as long as the message
- Each key can only encrypt a single message
- Parties must share keys of total length equal to total length of all messages they might ever want to send

#### Using same key twice
- c1 xor c2 = (k xor m1) xor (k xor m2) = m1 xor m2
- (leaks info) - reveals exactly where the messages differ (xor is 0 where they are the same and 1 where they differ) - also allows for frequency analysis
- ASCII specific info leaks:
  - all letters begin with 01
  - space character begins with 00
  - so xor of letter and space = 01, letter and letter = 00
  - once you know a space in one cipher, you can solve for the letter in the other ciphertext

## Drawbacks inherent to any perfect secrecy schem
- Key length has to equal message length or greater
- Can only use key once
- Assume |K| < |M| (we argue it implies scheme can't be perfectly secret
- Show Pr[M=m | C=c] != Pr[M=m]
- (assuming uniform distribution for now)
- M(c) = { Dec_k(c) }k (decrypting with all k's)
- |M(c)| <= |K| <= |M| so there is some "m" that is not in M(c)
- Pr[M=m | C=c] = 0 (no key can generate "m")
- 0 differs from a priori assumption of uniform distribution

## Computational Secrecy
- Only considers "efficient" attackers
- Security can fail with "some tiny probability"
- Event with 2^-60 / sec probability will only happen once every 100 billion years
- Modern key space: 2^128 (supercomputer at 1 key / cpu cycle since the big bang would only cover 2^112)
- Perfect indistinguishability:
  - Given two messages, scheme is secure if no adversary can guess 
- PI = (Gen, Enc, Dec) and A an adversary
- A outputs m0 and m1
- k <- Gen, b <- {0,1}, c <- Enc_k (m_b)
- b' <- A(c) (guess as to which of two messages is encrypted)
- A succeeds if b=b' and experiment evaluates to 1
- Easy to succeed with 50% probability
- If Pr[PrivK_A,PI = 1] = 1/2
- PI is perfectly indistinguishable if and only if it is perfectly secret

### Concrete approach
- PI is (t, epsilon)-indistinguishable if for all attackers A running in time at most t, it holds that Pr[PrivK_A,PI = 1] <= 1/2 + epsilon

### Asymptotic security
- Security parameter "n" fixed at initialization
- Can be thought of as the key length for now
- Attacker knows n
- Computational indistinguishability: 
  - 
  - 
- A fn f: Z+ -> Z+ is polynomial if there exists a c_i such that f(n) < SUM(c_i * n^i) for all n
- A fn f: Z+ -> R+,0 is negligible if for every polynomial p there is an N such that f(n) < 1/p(n) for n > N
  - Typical example: f(n) = poly(n)*2^(-cn)
- Poly * poly = poly
- poly * negligible = negligible
- We now assume Gen, Enc, Dec run in polynomial time
- Gen takes as input 1^n; outputs k (assume |k| > n)
- Enc takes as input key k and message m ({0, 1}*) -- messages of arbitrary length
- Dec takes key k and ciphertext c as input, outputs message m

- Fix PI, A
- Define experiment PrivK_A,PI(n)
- A(1^n) outputs m0, m1 of equal length
- k <- Gen(1^n), b <- {0,1}, c <- Enc_k(m_b)
- b' <- A(c)
- PI is indistinguishable if for all PPT attackers A, there is a negligible function epsilon such that
  Pr[PrivK_A,PI(n) = 1] <= 1/2 + epsilon(n)
- Note that we force m0 and m1 to be equal length, but in the real world, leaking the plaintext length can definitely be problematic

## Pseudorandomness
- Use "uniform" and "random" more or less interchangeably here
- Randomness is not a property of an individual outcome, only a property of a distribution that produces those outcomes
- Distribution on n-bit strings is a function:
  D: {0,1}^n -> [0,1] such that SUM (D(x)) = 1
- Uniform distribution U_n(x) = 2^-n for every x (where x is an element of {0,1}^n)
- x <- D means "sample x according to D"
- D is pseudorandom if it passes all _efficient_ statistical tests
- D is (t, epsilon)-psuedorandom if for all A running in time <= t
  |Pr_x<-D[A(x)=1] - Pr_x<-U_n[A(x)=1]| <= epsilon
- Asymptotic version:
  Let D_n be a distribution over p(n)-bit strings (p = polynomial)
  Pseudorandomness is a property of a _sequence_ of distributions
  {D_n} = {D_1, D_1, ...}
  {D_n} is pseudorandom if every probabilistic polynomial time A there is a negligible function epsilon such that 
  |Pr_x<-D_n[A(x)=1] - Pr_x<-U_p(n)[A(x)=1]| <= epsilon(n)

## Pseudorandom Generators
- Let G be a deterministic, poly-time algo
- G is expanding: |G(x)| = p(|x|) > |x| (length of x is expanded)
- D_n is the distribution on p(n)-bit strings defined by choosing x <- U_n and outputting G(x)
- G is a pseudorandom generator if {D_n} is pseudorandom
- |Pr_x<-U_n[A(G(x)) = 1] - Pr_y<-U_p(n)[A(y) = 1] | <= epsilon(n)
  (No efficient A can distinguish whether it is given G(x) or a uniform string y
- Do PRGs exists? We don't know until at least we know P=NP. We basically assume a specific "G" is a PRG and work from there

## The Pseudo One-Time Pad
- One-time pad relied on key length being equal to message length
- We can now use an n-bit key, applied through a PRG into a p-bit pseudo key
- |G(k)| = p(|k|) (| = length)
- Gen(1^n): uniform n-bit key k
  - Security param n => message space {0,1}^p(n)
- Enc_k(m) G(k) XOR m
- IF we assume that G is a PRG, we can prove computational secrecy

## Proofs of Security
- G in the pseudo one-time pad is a psuedorandom generator? if so, scheme will be computationally secure
- G is an efficient, deterministic functionk |G(k)| = 2 * |k|
- D is a distinguishing function that outputs 1 if an input string was generated from a uniform distribution
- Output of D should be close whether D is fed from uniform dist or from G
- mu is probability that attacked "A" succeeds
- If G is psuedorandom, Pr[PrivK_A,PI(n) = 1] <= 1/2 + epsilon(n)
- All hinges on G being psuedorandom -- which we have to just assume
- Scheme can only be broken if a weakness if found in G (less likely) or the definition of security chosen isn't sufficiently strong (more likely)
