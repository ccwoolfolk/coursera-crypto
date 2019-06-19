## Stronger security notions
- Perfect secrecy requires
  1) key as long as message
  2) key can only be used once
- Have subverted #1 with pseudo one time pad
- Now we look at weakening #2
- CPA-security: security against chosen plaintext attacks, stronger form of security
  - Nowadays, minimal notion of security an encryption scheme should satisfy

### CPA-security
- Assume attacker can repeatedly specify a message m_i and cause sender to encrypt and send cipher
- If a sender then sends a different message, we don't want the attacker to know anything extra given its prior exposure to messages/ciphers
- Fix encryption scheme, PI, and an attacker, A
- PrivCPA_A,PI(n):
- k <- Gen(1^n)
- A(1^n) interacts with an _encryption oracle_, Enc_k(*), and then outputs m_0 and m_1 of same length
- b <- {0,1}, c <- Enc_k(m_b)
- Give c to A
- A interacts with Enc_k(*) more if desired
- A outputs b' and succeeds if b == b' (exp evaluates to 1)
- PI is CPA-secure if for all PPT attackers A, there is negligible function epsilon such that probability A succeeds is <= 1/2 + epsilon(n)
- If we want to achieve this, we have to use randomized encryption where encrypting the same message multiple times yields different ciphers

## Psuedorandom Functions and Block Ciphers
- Func_n = all functions mapping {0, 1}^n to {0, 1}^n
- | Func_n | = 2^(n * 2^n)
- "Random function" here means "uniform function that is an element of Func_n"
- Keyed functions:
  - F_k(x) = F(k, x) i.e., Psuedorandom function takes a key and an x
  - | k | = | x | = | F(k, x) |
- F is psuedorandom function if F_k for uniform key is indistinguishable from a uniform function
- Given access to an oracle (can give inputs and receive outputs), prob that D outputs 1 when given pseudo and true random function is < epsilon(n)

### PRFs vs PRGs
- PRF F immediately implies a PRG G
  - Define G(k) = F_k(0 ... 0) | F_k(0 ... 1)
- PRF can be viewed as a PRG with random access to exponentially long output

### Pseudorandom permutations
- F is length-preserving, keyed function
- F is a keyed permutation if
  - F_k is a bijection for every k (F_k is one-to-one and onto F for every possible k)
  - F_k inverse is efficiently computable

### Block ciphers
- Practical instantiations of pseudorandom permutations
- Defined on fixed block and key length
- Hard to distinguish F_k from uniform perm even for attackers running in time ~2^n (more powerful than polynomial time)

### AES

